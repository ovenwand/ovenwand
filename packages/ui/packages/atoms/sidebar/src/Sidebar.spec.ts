/// <reference types="cypress" />

import { testAttribute, testClassName } from '@ovenwand/test.cypress';
import Sidebar from './Sidebar.svelte';
import { DEFAULT_ID } from './store';

describe('@ovenwand/svelte-sidebar', () => {
	describe('Sidebar', () => {
		it(
			'has a default id',
			testAttribute(() => ({
				wrapper: cy.render(Sidebar),
				selector: '.ow-sidebar',
				attribute: 'id',
				value: DEFAULT_ID
			}))
		);

		it(
			'passes down id',
			testAttribute(() => ({
				wrapper: cy.render(Sidebar, { id: 'id' }),
				selector: '.ow-sidebar',
				attribute: 'id',
				value: 'id'
			}))
		);

		it(
			'passes down classNames',
			testClassName(() => ({
				wrapper: cy.render(Sidebar).as('sidebar'),
				component: '@sidebar',
				selector: '.ow-sidebar'
			}))
		);
	});
});
