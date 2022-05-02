import type { RenderResult } from '@testing-library/svelte';

export type AsyncFunction<A extends unknown[] = unknown[], R = unknown> = (
	...args: A
) => Promise<R>;

export type TestOptions<O = Record<string, unknown>> = () => {
	wrapper: RenderResult;
	props?: Record<string, unknown>;
	getElement?: (wrapper: RenderResult) => HTMLElement;
} & O;
