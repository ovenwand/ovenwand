import type { AsyncFunction, TestOptions } from './util';
import { getElement } from './util';
import { assertAttributeValue } from './assertions';

export function testAttribute(
	options: TestOptions<{ attributeName: string; attributeValue: string }>
): AsyncFunction {
	return async () => {
		const { wrapper, attributeName, attributeValue } = options();
		const element = getElement(wrapper);

		assertAttributeValue(element, attributeName, attributeValue);
	};
}
