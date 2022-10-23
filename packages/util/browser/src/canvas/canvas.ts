import { createTicker, isNumber } from '@ovenwand/util.fp';
import { color, PI } from '@ovenwand/util.math';

export type FillStyle = string | CanvasGradient | CanvasPattern;
export type StrokeStyle = string | CanvasGradient | CanvasPattern;
export interface Engine {
	setup: (fn: (arg: ISetupContext) => void) => void;
	update: (fn: () => void) => void;
	draw: (fn: (arg: IDrawContext) => void) => void;
	resume: () => void;
	stop: () => void;
}

export interface ISetupContext {
	onClick(handler: (x: number, y: number) => unknown): void;
	onMouseMove(handler: (x: number, y: number) => unknown): void;
}

export interface IUpdateContext {
	mouseX: number;
	mouseY: number;
}

export interface IDrawContext {
	save(): void;
	restore(): void;
	translate(x: number, y: number): void;
	fill(style: FillStyle | number, g?: number, b?: number, a?: number): void;
	noFill(): void;
	font(style: string): void;
	stroke(style: StrokeStyle | number, g?: number, b?: number, a?: number): void;
	noStroke(): void;
	strokeWeight(weight: number): void;
	background(style: FillStyle | number): void;
	rect(x: number, y: number, width: number, height: number): void;
	circle(x: number, y: number, radius: number): void;
	line(x1: number, y1: number, x2: number, y2: number): void;
	point(x: number, y: number): void;
	text(x: number, y: number, text: string, maxWidth?: number): void;
	mouseX: number;
	mouseY: number;
}

export function createEngine(canvas: HTMLCanvasElement): Engine {
	const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
	let _update: () => void, _resume: () => void, _stop: () => void;

	let mouseX = 0,
		mouseY = 0;

	function setup(setupFn: (context: ISetupContext) => void) {
		const pointerEventListenerToMethodMap = {
			click: 'onClick',
			mousemove: 'onMouseMove'
		};

		const keyEventListenerToMethodMap = {
			keydown: 'onKeyDown'
		};

		const listeners: Record<string, ((x: number, y: number) => unknown)[]> = {};
		const context: Partial<ISetupContext> = {};

		for (const type of Object.keys(pointerEventListenerToMethodMap)) {
			canvas.addEventListener(type, (event: MouseEvent) => {
				const { x, y } = canvas.getBoundingClientRect();
				mouseX = event.clientX - x;
				mouseY = event.clientY - y;

				if (!listeners[type]) {
					return;
				}

				for (const listener of listeners[type]) {
					listener(mouseX, mouseY, event);
				}
			});

			context[pointerEventListenerToMethodMap[type]] = (listener) => {
				if (!listeners[type]) {
					listeners[type] = [];
				}

				listeners[type].push(listener);
			};
		}

		for (const type of Object.keys(keyEventListenerToMethodMap)) {
			canvas.addEventListener(type, (event: KeyboardEvent) => {
				if (!listeners[type]) {
					return;
				}

				for (const listener of listeners[type]) {
					listener(event.key, event);
				}
			});

			context[keyEventListenerToMethodMap[type]] = (listener) => {
				if (!listeners[type]) {
					listeners[type] = [];
				}

				listeners[type].push(listener);
			};
		}

		setupFn(context as ISetupContext);
	}

	function update(updateFn: (context: IUpdateContext) => void): void {
		_update = () =>
			updateFn({
				mouseX,
				mouseY
			});
	}

	function draw(drawFn: (context: IDrawContext) => void): void {
		let fillStyle: FillStyle | null, previousFillStyle: FillStyle | null;
		let strokeStyle: StrokeStyle | null, previousStrokeStyle: StrokeStyle | null;
		let lineWidth: number, previousLineWidth: number;
		let fontStyle: string, previousFontStyle: string;

		function _setFillStyle() {
			if (!fillStyle) {
				return;
			}

			context.fillStyle = fillStyle;
		}

		function _setStrokeStyle() {
			if (!strokeStyle) {
				return;
			}

			context.strokeStyle = strokeStyle;
		}

		function _setStrokeWeight() {
			if (!lineWidth) {
				return;
			}

			context.lineWidth = lineWidth;
		}

		function _setFontStyle() {
			if (!fontStyle) {
				return;
			}

			context.font = fontStyle;
		}

		function save() {
			previousFillStyle = fillStyle;
			previousStrokeStyle = strokeStyle;
			previousLineWidth = lineWidth;
			previousFontStyle = fontStyle;
			context.save();
		}

		function restore() {
			fillStyle = previousFillStyle;
			strokeStyle = previousStrokeStyle;
			lineWidth = previousLineWidth;
			fontStyle = previousFontStyle;
			context.restore();
		}

		function translate(x: number, y: number) {
			context.translate(x, y);
		}

		function fill(style: FillStyle | number, g?: number, b?: number, a?: number) {
			fillStyle = isNumber(style) ? color(style, g, b, a) : style;
		}

		function noFill() {
			fillStyle = null;
			_setFillStyle();
		}

		function stroke(style: StrokeStyle | number, g?: number, b?: number, a?: number) {
			strokeStyle = isNumber(style) ? color(style, g, b, a) : style;
		}

		function noStroke() {
			strokeStyle = null;
			_setStrokeStyle();
		}

		function strokeWeight(weight: number) {
			lineWidth = weight;
		}

		function background(style: FillStyle | number, g?: number, b?: number, a?: number) {
			save();
			fill(style, g, b, a);
			rect(0, 0, canvas.width, canvas.height);
			restore();
		}

		function rect(x: number, y: number, width: number, height: number) {
			if (fillStyle) {
				_setFillStyle();
				context.fillRect(x, y, width, height);
			}

			if (strokeStyle) {
				_setStrokeStyle();
				_setStrokeWeight();
				context.strokeRect(x, y, width, height);
			}

			if (!fillStyle && !strokeStyle) {
				context.clearRect(x, y, width, height);
			}
		}

		function circle(x: number, y: number, r: number) {
			_setFillStyle();
			_setStrokeStyle();
			_setStrokeWeight();

			context.beginPath();
			context.arc(x, y, r, 0, 2 * PI);

			if (fillStyle) {
				context.fill();
			}

			if (strokeStyle) {
				context.stroke();
			}
		}

		function line(x1: number, y1: number, x2: number, y2: number) {
			_setStrokeStyle();
			_setStrokeWeight();

			context.beginPath();
			context.moveTo(x1, y1);
			context.lineTo(x2, y2);
			context.stroke();
		}

		function point(x: number, y: number) {
			_setFillStyle();
			_setStrokeStyle();
			_setStrokeWeight();

			context.beginPath();
			context.arc(x, y, context.lineWidth / 2, 0, 2 * PI);
			context.fill();
		}

		function font(font: string) {
			fontStyle = font;
		}

		function text(x: number, y: number, text: string, maxWidth?: number) {
			context.textAlign = 'start';
			context.textBaseline = 'top';
			const { fontBoundingBoxAscent, fontBoundingBoxDescent, width } = context.measureText(text);
			const height = fontBoundingBoxAscent + fontBoundingBoxDescent;

			_setFontStyle();

			if (fillStyle) {
				_setFillStyle();
				context.fillText(text, x - width / 2, y - height / 2, maxWidth);
			}

			if (strokeStyle) {
				_setStrokeStyle();
				_setStrokeWeight();
				context.strokeText(text, x - width / 2, y - height / 2, maxWidth);
			}
		}

		[_resume, _stop] = createTicker(() => {
			if (_update) {
				_update();
			}

			save();

			drawFn({
				background,
				circle,
				fill,
				noFill,
				font,
				line,
				point,
				rect,
				restore,
				save,
				stroke,
				noStroke,
				strokeWeight,
				text,
				translate,
				mouseX,
				mouseY
			});

			restore();
		});

		resume();
	}

	function stop() {
		_stop();
	}

	function resume() {
		_resume();
	}

	return { setup, update, draw, stop, resume };
}
