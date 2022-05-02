export function assertAttributeValue(
	selector: string,
	attribute: string,
	value: string
): Cypress.Chainable {
	return cy.get(selector).should('have.attr', attribute, value);
}
