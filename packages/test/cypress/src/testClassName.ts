import type { TestOptions } from './util';
import { assertClassName } from './assertions';

export function testClassName(
	options: TestOptions<{ selector: string; component: string }>
): () => void {
	return () => {
		const testClassName = 'test';
		const { selector, component } = options();

		assertClassName(selector, testClassName, false);
		cy.get(component).set({ class: testClassName });
		assertClassName(selector, testClassName, true);
	};
}
