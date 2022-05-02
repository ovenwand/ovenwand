import type { RenderResult } from '@testing-library/svelte';

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Cypress {
		interface Chainable {
			set<Props>(component: RenderResult, props: Props): Chainable<RenderResult>;
		}
	}
}

Cypress.Commands.add('set', { prevSubject: true }, (result: RenderResult, props) => {
	return cy.then(() => {
		const { component } = result;
		return cy.wrap(component.$$set(props)).then(() => result);
	});
});
