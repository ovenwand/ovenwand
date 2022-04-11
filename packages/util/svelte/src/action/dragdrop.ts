const draggables: Map<string, HTMLElement[]> = new Map();
const droppables: Map<string, HTMLElement[]> = new Map();

function createDragEvent(type: string, mouseEvent: MouseEvent): DragEvent {
	const eventInitDict: DragEventInit = new MouseEvent(mouseEvent.type, mouseEvent);
	eventInitDict.dataTransfer = new DataTransfer();
	return new DragEvent(type, eventInitDict);
}

function createGhostElement(element) {
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

function findTargetElement(element) {
	const { display } = getComputedStyle(element);
	return display === 'contents' ? findTargetElement(element.firstChild) : element;
}

function findDropTarget(id: string, { clientX, clientY }: MouseEvent) {
	for (const droppable of droppables.get(id)) {
		const { x, y, width, height } = findTargetElement(droppable).getBoundingClientRect();
		const isInHorizontalBounds = clientX >= x && clientX <= x + width;
		const isInVerticalBounds = clientY >= y && clientY <= y + height;

		if (isInHorizontalBounds && isInVerticalBounds) {
			return droppable;
		}
	}
}

export function draggable(
	node: HTMLElement,
	{ id = 'default' }: { id?: string } = {}
): { destroy: () => void } {
	let dragTarget: HTMLElement = null;
	let dropTarget: HTMLElement = null;
	let ghostElement: HTMLElement = null;
	let startX = 0;
	let startY = 0;
	let dragging = false;

	if (!draggables.has(id)) {
		draggables.set(id, []);
	}

	draggables.get(id).push(node);

	node.addEventListener('mousedown', onMouseDown);

	function onMouseDown(event: MouseEvent) {
		event.preventDefault();

		dragTarget = node;
		ghostElement = createGhostElement(dragTarget);

		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);

		startX = event.clientX;
		startY = event.clientY;
	}

	function onMouseUp(event: MouseEvent) {
		dragging = false;

		dragTarget.dispatchEvent(createDragEvent('dragend', event));
		dragTarget = null;

		if (dropTarget) {
			dropTarget.dispatchEvent(createDragEvent('drop', event));
			dropTarget = null;
		}

		document.body.removeChild(ghostElement);
		ghostElement = null;

		window.removeEventListener('mousemove', onMouseMove);
		window.removeEventListener('mouseup', onMouseUp);

		startX = 0;
		startY = 0;
	}

	function onMouseMove(event: MouseEvent) {
		const { clientX, clientY } = event;
		const previousDropTarget = dropTarget;

		ghostElement.style.transform = `translate3d(${clientX - startX}px, ${clientY - startY}px, 0)`;

		dropTarget = findDropTarget(id, event);

		if (!dragging && dragTarget) {
			dragTarget.dispatchEvent(createDragEvent('dragstart', event));
			dragging = true;
		}

		if (!dropTarget && previousDropTarget) {
			previousDropTarget.dispatchEvent(createDragEvent('dragleave', event));
		} else if (dropTarget && dropTarget === previousDropTarget) {
			dropTarget.dispatchEvent(createDragEvent('dragover', event));
		} else {
			if (previousDropTarget) {
				previousDropTarget.dispatchEvent(createDragEvent('dragleave', event));
			}

			if (dropTarget) {
				dropTarget.dispatchEvent(createDragEvent('dragenter', event));
				dropTarget.dispatchEvent(createDragEvent('dragover', event));
			}
		}
	}

	return {
		destroy() {
			draggables.get(id).splice(draggables.get(id).indexOf(node), 1);
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseup', onMouseUp);
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

	droppables.get(id).push(node);

	return {
		destroy() {
			droppables.get(id).splice(droppables.get(id).indexOf(node), 1);
		}
	};
}
