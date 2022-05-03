/// <reference types="cypress" />

import { SvelteComponent } from 'svelte';
import type { RenderResult } from '@testing-library/svelte';
import { render } from '@testing-library/svelte';

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Cypress {
		interface Chainable {
			render<Props>(component: typeof SvelteComponent, props: Props): Chainable<RenderResult>;
		}
	}
}

Cypress.Commands.add('render', (component: typeof SvelteComponent, props) => {
	return cy.then(() => {
		return cy.wrap(render(component, { props }));
	});
});
