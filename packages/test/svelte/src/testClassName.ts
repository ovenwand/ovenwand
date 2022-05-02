import type { AsyncFunction, TestOptions } from './util';
import { getElement } from './util';
import { assertClassName } from './assertions';

export function testClassName(options: TestOptions): AsyncFunction {
	return async () => {
		const testClassName = 'test';

		const { wrapper } = options();
		const { component } = wrapper;
		const element = getElement(wrapper);

		assertClassName(element, testClassName, false);
		await component.$set({ class: testClassName });
		assertClassName(element, testClassName, true);
	};
}
