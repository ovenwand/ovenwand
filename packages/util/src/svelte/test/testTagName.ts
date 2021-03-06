import { AsyncFunction, getElement, TestOptions } from './util';
import { assertTagName } from './assertions';

export function testTagName(options: TestOptions<{ tagName: string }>): AsyncFunction {
    return async () => {
        const { wrapper, tagName } = options();
        const element = getElement(wrapper);

        assertTagName(element, tagName);
    };
}
