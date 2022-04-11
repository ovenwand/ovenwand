/// <reference types="mocha" />
/// <reference types="svelte" />

import { render as _render, testAttribute, testClassName } from '@ovenwand/util.svelte/test';
import Sidebar from './Sidebar.svelte';
import { DEFAULT_ID } from './store';

function render(props: Record<string, unknown> = {}) {
	return _render(Sidebar, {
		props
	});
}

describe('@ovenwand/svelte-sidebar', () => {
	describe('Sidebar', () => {
		it(
			'has a default id',
			testAttribute(() => ({
				attributeName: 'id',
				attributeValue: DEFAULT_ID,
				wrapper: render()
			}))
		);

		it(
			'passes down id',
			testAttribute(() => ({
				attributeName: 'id',
				attributeValue: 'id',
				wrapper: render({ id: 'id' })
			}))
		);

		it(
			'passes down classNames',
			testClassName(() => ({
				wrapper: render()
			}))
		);
	});
});
