import { isNumber } from '@ovenwand/util.fp';

export function color(r: number, g?: number, b?: number, a?: number): string;
export function color(...args: [number, number?, number?, number?]): string {
	args = args.filter(isNumber) as typeof args;

	const [r, g = 0, b = 0, a = 1] = args;
	const numArgs = args.length;
	const results: number[] = [0, 0, 0, 0];

	if (numArgs >= 3) {
		// Argument is a list of component values.
		results[0] = r;
		results[1] = g as number;
		results[2] = b as number;
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
		}
	} else if (numArgs !== 1 && typeof r !== 'string') {
		throw new Error(`${args}is not a valid color representation.`);
	}

	results[3] = results[3] ?? a;

	return `rgba(${results[0]},${results[1]},${results[2]},${results[3]})`;
}
