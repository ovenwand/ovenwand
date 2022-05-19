export function noop<T = unknown>(returnValue?: T): (...args: unknown[]) => T {
	return () => returnValue as T;
}
