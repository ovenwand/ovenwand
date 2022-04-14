import { createTicker } from '@ovenwand/util.fp';
import { color, PI } from '@ovenwand/util.math';

export type Hook<T> = (hook: (context: T) => void) => void;
export type FillStyle = string | CanvasGradient | CanvasPattern;
export type StrokeStyle = string | CanvasGradient | CanvasPattern;
export type Engine = [Hook<ISetupContext>, Hook<IDrawContext>, Fn, Fn];
export type Fn<T = undefined, R = void> = (arg?: T) => R;

export interface ISetupContext {
	onClick(handler: (x: number, y: number) => unknown): void;
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
	const context: CanvasRenderingContext2D = canvas.getContext('2d');
	let _resume: () => void, _stop: () => void;

	function setup(setupFn: Fn<ISetupContext>) {
		function onClick(handler: (x: number, y: number) => unknown) {
			canvas.addEventListener('click', (event) => {
				const rect = canvas.getBoundingClientRect();
				const x = event.clientX - rect.x;
				const y = event.clientY - rect.y;
				handler(x, y);
			});
		}

		setupFn({
			onClick
		});
	}

	function draw(drawFn: (context: IDrawContext) => void): void {
		let mouseX = 0;
		let mouseY = 0;

		let fillStyle: FillStyle, previousFillStyle: FillStyle;
		let strokeStyle: StrokeStyle, previousStrokeStyle: StrokeStyle;
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
			fillStyle = typeof style === 'number' ? color(style, g, b, a) : style;
		}

		function noFill() {
			fillStyle = null;
			_setFillStyle();
		}

		function stroke(style: StrokeStyle | number, g?: number, b?: number, a?: number) {
			strokeStyle = typeof style === 'number' ? color(style, g, b, a) : style;
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

		function line(x1, y1, x2, y2) {
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

		function onMouseMove(event) {
			const { clientX, clientY } = event;
			const { x, y } = canvas.getBoundingClientRect();
			mouseX = clientX - x;
			mouseY = clientY - y;
		}

		canvas.addEventListener('mousemove', onMouseMove);

		[_resume, _stop] = createTicker(() => {
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

	return [setup, draw, stop, resume];
}
