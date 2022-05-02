import type { TestOptions } from './util';
import { assertAttributeValue } from './assertions';

export function testAttribute(
	options: TestOptions<{ selector: string; attribute: string; value: string }>
): () => void {
	return () => {
		const { selector, attribute, value } = options();
		assertAttributeValue(selector, attribute, value);
	};
}
