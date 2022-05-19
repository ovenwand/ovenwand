import { abs } from '@ovenwand/util.math';
import { preventDefault } from '@ovenwand/util.fp';

const draggables: Map<string, HTMLElement[]> = new Map();
const droppables: Map<string, HTMLElement[]> = new Map();

function createDragEvent(type: string, mouseOrTouchEvent: MouseEvent | TouchEvent): DragEvent {
	const eventInitDict: DragEventInit =
		mouseOrTouchEvent instanceof MouseEvent
			? new MouseEvent(mouseOrTouchEvent.type, mouseOrTouchEvent)
			: new TouchEvent(mouseOrTouchEvent.type, mouseOrTouchEvent as unknown as TouchEventInit);

	if (mouseOrTouchEvent instanceof MouseEvent) {
		eventInitDict.dataTransfer = new DataTransfer();
	}

	return new DragEvent(type, eventInitDict);
}

function dispatch(type: string, target: EventTarget, event: MouseEvent | TouchEvent): void {
	target.dispatchEvent(createDragEvent(type, event));
}

function createGhostElement(element: HTMLElement): HTMLElement {
	const target = findTargetElement(element);
	const rect = target.getBoundingClientRect();
	const ghost = target.cloneNode(true) as HTMLElement;
	ghost.style.pointerEvents = 'none';
	ghost.style.position = 'absolute';
	ghost.style.left = `${rect.x}px`;
	ghost.style.top = `${rect.y}px`;
	ghost.style.width = `${rect.width}px`;
	ghost.style.height = `${rect.height}px`;
	document.body.appendChild(ghost);
	return ghost;
}

function findTargetElement(element: HTMLElement): HTMLElement {
	const { display } = getComputedStyle(element);
	const target =
		display === 'contents' ? findTargetElement(element.firstChild as HTMLElement) : element;
	return target || element;
}

function findDropTarget(id: string, event: MouseEvent | TouchEvent): HTMLElement | null {
	const { clientX, clientY } = findEventCoordinates(event);

	for (const droppable of droppables.get(id) || []) {
		const { x, y, width, height } = findTargetElement(droppable).getBoundingClientRect();
		const isInHorizontalBounds = clientX >= x && clientX <= x + width;
		const isInVerticalBounds = clientY >= y && clientY <= y + height;

		if (isInHorizontalBounds && isInVerticalBounds) {
			return droppable;
		}
	}

	return null;
}

function findEventCoordinates(event: MouseEvent | TouchEvent): {
	clientX: number;
	clientY: number;
	pageX: number;
	pageY: number;
} {
	const result: MouseEvent | Touch =
		event instanceof MouseEvent ? event : (event.touches.item(0) as Touch);

	return {
		clientX: result.clientX,
		clientY: result.clientY,
		pageX: result.pageX,
		pageY: result.pageY
	};
}

export function draggable(
	node: HTMLElement,
	{ id = 'default' }: { id?: string } = {}
): { destroy: () => void } {
	let dragTarget: HTMLElement | null = null;
	let dropTarget: HTMLElement | null = null;
	let ghostElement: HTMLElement | null = null;
	let startX = 0;
	let startY = 0;
	let dragging = false;

	if (!draggables.has(id)) {
		draggables.set(id, []);
	}

	draggables.get(id)?.push(node);

	bindStartEvents();

	function onInteractionStart(event: MouseEvent | TouchEvent) {
		const { clientX, clientY } = findEventCoordinates(event);

		dragTarget = node;

		bindDragEvents();

		startX = clientX;
		startY = clientY;
	}

	function onInteractionMove(event: MouseEvent | TouchEvent) {
		preventDefault(event);

		const { pageX, pageY } = findEventCoordinates(event);

		// Prevent triggering the drag event by accident by adding a threshold
		if (abs(pageX - startX) + abs(pageY - startY) < 4) {
			return false;
		}

		if (!dragTarget) {
			return false;
		}

		const previousDropTarget = dropTarget;

		ghostElement = ghostElement || createGhostElement(dragTarget);

		dragTarget.style.pointerEvents = 'none';
		ghostElement.style.transform = `translate3d(${pageX - startX}px, ${pageY - startY}px, 0)`;

		dropTarget = findDropTarget(id, event);

		if (!dragging && dragTarget) {
			dispatch('dragstart', dragTarget, event);
			dragging = true;
		}

		if (!dropTarget && previousDropTarget) {
			dispatch('dragleave', previousDropTarget, event);
		} else if (dropTarget && dropTarget === previousDropTarget) {
			dispatch('dragover', dropTarget, event);
		} else {
			if (previousDropTarget) {
				dispatch('dragleave', previousDropTarget, event);
			}

			if (dropTarget) {
				dispatch('dragenter', dropTarget, event);
				dispatch('dragover', dropTarget, event);
			}
		}

		return false;
	}

	function onInteractionEnd(event: MouseEvent | TouchEvent) {
		dragging = false;

		if (!dragTarget) {
			return;
		}

		dragTarget.style.pointerEvents = '';

		dispatch('dragend', dragTarget, event);
		dragTarget = null;

		if (dropTarget) {
			dispatch('drop', dropTarget, event);
			dropTarget = null;
		}

		if (ghostElement) {
			document.body.removeChild(ghostElement);
			ghostElement = null;
		}

		unbindDragEvents();

		startX = 0;
		startY = 0;
	}

	function bindStartEvents() {
		node.addEventListener('mousedown', onInteractionStart);
		node.addEventListener('touchstart', onInteractionStart);
	}

	function unbindStartEvents() {
		node.removeEventListener('mousedown', onInteractionStart);
		node.removeEventListener('touchstart', onInteractionStart);
	}

	function bindDragEvents() {
		window.addEventListener('mousemove', onInteractionMove, { passive: false });
		window.addEventListener('mouseup', onInteractionEnd);
		window.addEventListener('touchmove', onInteractionMove, { passive: false });
		window.addEventListener('touchend', onInteractionEnd);
	}

	function unbindDragEvents() {
		window.removeEventListener('mousemove', onInteractionMove);
		window.removeEventListener('mouseup', onInteractionEnd);
		window.removeEventListener('touchmove', onInteractionMove);
		window.removeEventListener('touchend', onInteractionEnd);
	}

	return {
		destroy() {
			const index = draggables.get(id)?.indexOf(node);

			if (index && index >= 0) {
				draggables.get(id)?.splice(index, 1);
			}

			unbindStartEvents();
			unbindDragEvents();
		}
	};
}

export function droppable(
	node: HTMLElement,
	{ id = 'default' }: { id?: string } = {}
): { destroy: () => void } {
	if (!droppables.has(id)) {
		droppables.set(id, []);
	}

	droppables.get(id)?.push(node);

	return {
		destroy() {
			const index = droppables.get(id)?.indexOf(node);

			if (index && index >= 0) {
				droppables.get(id)?.splice(index, 1);
			}
		}
	};
}
