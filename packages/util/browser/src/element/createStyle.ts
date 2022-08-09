import { isNullish } from '@ovenwand/util.fp';

export function createStyle(styleMap: Record<string, unknown>): string {
	let style = '';

	for (const key of Object.keys(styleMap)) {
		const value = styleMap[key];

		if (!isNullish(value)) {
			style += `${key.trim()}: ${String(value).trim()};`;
		}
	}

	return style.trim();
}
