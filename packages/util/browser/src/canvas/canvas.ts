import { createTicker } from '@ovenwand/util.fp';
import { PI } from '@ovenwand/util.math';

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
	fill(style: FillStyle): void;
	stroke(style: StrokeStyle, weight?: number): void;
	background(style: FillStyle): void;
	rect(x: number, y: number, width: number, height: number): void;
	circle(x: number, y: number, radius: number): void;
	line(x1: number, y1: number, x2: number, y2: number): void;
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
		let strokeWeight: number, previousStrokeWeight: number;

		function save() {
			previousFillStyle = fillStyle;
			previousStrokeStyle = strokeStyle;
			previousStrokeWeight = strokeWeight;
			context.save();
		}

		function restore() {
			fillStyle = previousFillStyle;
			strokeStyle = previousStrokeStyle;
			strokeWeight = previousStrokeWeight;
			context.restore();
		}

		function translate(x: number, y: number) {
			context.translate(x, y);
		}

		function fill(style: FillStyle) {
			fillStyle = style;
		}

		function stroke(style: StrokeStyle, weight?: number) {
			strokeStyle = style;

			if (weight != null) {
				strokeWeight = weight;
			}
		}

		function background(style: FillStyle) {
			save();
			fill(style);
			rect(0, 0, canvas.width, canvas.height);
			restore();
		}

		function rect(x: number, y: number, width: number, height: number) {
			if (fillStyle) {
				context.fillStyle = fillStyle;
				context.fillRect(x, y, width, height);
			}

			if (strokeStyle) {
				context.strokeStyle = strokeStyle;
				context.lineWidth = strokeWeight;
				context.strokeRect(x, y, width, height);
			}

			if (!fillStyle && !strokeStyle) {
				context.clearRect(x, y, width, height);
			}
		}

		function circle(x: number, y: number, r: number) {
			if (fillStyle) {
				context.fillStyle = fillStyle;
			}

			if (strokeStyle) {
				context.strokeStyle = strokeStyle;
			}

			context.beginPath();
			context.arc(x, y, r, 0, 2 * PI);
			context.fill();
		}

		function line(x1, y1, x2, y2) {
			if (strokeStyle) {
				context.strokeStyle = strokeStyle;
				context.lineWidth = strokeWeight;
			}

			context.beginPath();
			context.moveTo(x1, y1);
			context.lineTo(x2, y2);
			context.stroke();
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
				line,
				rect,
				restore,
				save,
				stroke,
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
