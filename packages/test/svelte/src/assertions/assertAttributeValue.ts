import { expect } from 'chai';

export function assertAttributeValue(
	element: HTMLElement,
	attributeName: string,
	attributeValue: string
): void {
	expect(element.getAttribute(attributeName)).to.equal(attributeValue);
}
