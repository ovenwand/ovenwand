import { AsyncFunction, getElement, TestOptions } from './util';
import { assertClassName } from './assertions';

export function testClassName(options: TestOptions): AsyncFunction {
	return async () => {
		const testClassName = 'test';
		const { wrapper } = options();
		const { component } = wrapper;
		const element = getElement(wrapper) as HTMLElement;

		assertClassName(element, testClassName, false);
		await component.$set({ class: testClassName });
		assertClassName(element, testClassName, true);
	};
}
