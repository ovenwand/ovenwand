import { isNumber, isString } from '@ovenwand/util.fp';

export function color(r: number, g?: number, b?: number, a?: number): string;
export function color(r: number, a?: number): string;
export function color(r: string): string;
export function color(...args: [number | string, number?, number?, number?]): string {
	if (isString(args[0])) {
		return args[0];
	}

	args = args.filter(isNumber) as number[];

	const numArgs = args.length;
	const r = args.shift();
	let [g, b, a = 1] = args;

	if (numArgs === 1 || numArgs === 2) {
		// 'Grayscale' mode.

		// Alpha may be passed as the second argument.
		if (isNumber(g)) {
			a = g;
		}

		g = r;
		b = r;
	}

	return `rgba(${r},${g},${b},${a})`;
}
