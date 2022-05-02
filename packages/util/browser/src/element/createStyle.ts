export function createStyle(styleMap: Record<string, unknown>): string {
	let style = '';

	for (const key of Object.keys(styleMap)) {
		const value = styleMap[key];

		if (value != null) {
			style += `${key.trim()}: ${value.toString().trim()};`;
		}
	}

	return style.trim();
}
