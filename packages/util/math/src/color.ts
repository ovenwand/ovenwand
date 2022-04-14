import { isNumber } from '@ovenwand/util.fp';

export function color(r: number, g?: number, b?: number, a?: number): string;
export function color(...args: number[]): string {
	args = args.filter(isNumber);

	const [r, g, b, a] = args;
	const numArgs = args.length;
	const results: number[] = [0, 0, 0, 0];

	if (numArgs >= 3) {
		// Argument is a list of component values.
		results[0] = r;
		results[1] = g;
		results[2] = b;

		// Alpha may be undefined, so default it to 100%.
		if (typeof a === 'number') {
			results[3] = a;
		} else {
			results[3] = 1;
		}
	} else if ((numArgs === 1 || numArgs === 2) && typeof r === 'number') {
		// 'Grayscale' mode.

		/**
		 * For HSB and HSL, interpret the gray level as a brightness/lightness
		 * value (they are equivalent when chroma is zero). For RGB, normalize the
		 * gray level according to the blue maximum.
		 */
		results[0] = r;
		results[1] = r;
		results[2] = r;

		// Alpha may be undefined, so default it to 100%.
		if (typeof g === 'number') {
			results[3] = g;
		} else {
			results[3] = 1;
		}
	} else if (numArgs !== 1 && typeof r !== 'string') {
		throw new Error(`${args}is not a valid color representation.`);
	}

	return `rgba(${results[0]},${results[1]},${results[2]},${results[3]})`;
}
