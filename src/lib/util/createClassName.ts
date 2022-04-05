export function createClassName(classList: Record<string, unknown>): string {
	let className = '';

	for (const key of Object.keys(classList)) {
		if (classList[key]) {
			className += ` ${key}`;
		}
	}

	return className.trim();
}
