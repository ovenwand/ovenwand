export function isNumber(value: unknown): value is number {
	return typeof value === 'number';
}

export function isBoolean(value: unknown): value is boolean {
	return typeof value === 'boolean';
}

export function isString(value: unknown): value is string {
	return typeof value === 'string';
}

/* eslint-disable-next-line @typescript-eslint/ban-types */
export function isFunction(value: unknown): value is Function {
	return typeof value === 'function';
}

export function isUndefined(value: unknown): value is undefined {
	return typeof value === 'undefined';
}

export function isNull(value: unknown): value is null {
	return value === null;
}

export function isNullish(value: unknown): value is null | undefined {
	return value == null;
}
