import { expect } from 'chai';

export function assertClassName(element: HTMLElement, className: string, hasClass: boolean): void {
	expect(element.classList.contains(className)).to.equal(hasClass);
}
