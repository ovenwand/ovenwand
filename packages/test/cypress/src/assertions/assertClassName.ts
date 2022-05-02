export function assertClassName(
	selector: string,
	className: string,
	hasClass: boolean
): Cypress.Chainable {
	return cy.get(selector).should(hasClass ? 'have.class' : 'not.have.class', className);
}
