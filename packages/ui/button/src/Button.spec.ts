/// <reference types="cypress" />

import { testClassName } from '@ovenwand/test.cypress';
import Button from './Button.svelte';

describe('@ovenwand/ui.button', () => {
	describe('Button', () => {
		it(
			'passes down classNames',
			testClassName(() => ({
				wrapper: cy.render(Button).as('button'),
				component: '@button',
				selector: 'button'
			}))
		);
	});
});
