import { expect } from 'chai';

export function assertTagName(element: HTMLElement, tagName: string): void {
	expect(element.tagName).to.equal(tagName);
}
