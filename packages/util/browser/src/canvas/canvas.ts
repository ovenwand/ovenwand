import { createTicker } from '@ovenwand/util.fp';

export type FillStyle = string | CanvasGradient | CanvasPattern;
export type StrokeStyle = string | CanvasGradient | CanvasPattern;

export function createEngine(element: Node) {
	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let resume: () => void, stop: () => void;

	function createCanvas(width: number, height: number) {
		canvas = document.createElement('canvas');
		context = canvas.getContext('2d');
		canvas.width = width;
		canvas.height = height;
		element.appendChild(canvas);
	}

	function setup(setupFn) {
		return setupFn({
			createCanvas
		});
	}

	function draw(drawFn) {
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
			context.arc(x, y, r, 0, 2 * Math.PI);
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

		[resume, stop] = createTicker(() => {
			save();

			drawFn({
				background,
				circle,
				fill,
				line,
				rect,
				restore,
				stroke,
				translate
			});

			restore();
		});

		resume();
	}

	return [setup, draw];
}
