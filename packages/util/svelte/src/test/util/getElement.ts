import type { RenderResult } from '@testing-library/svelte';

export function getElement(wrapper: RenderResult): HTMLElement {
	return wrapper.container.firstChild.firstChild as HTMLElement;
}
