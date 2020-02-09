/// <reference types="cypress" />

describe('basic test', () => {
	it('should pass through initialization successfully', () => {
		cy.server();
		cy.route('https://www.hebcal.com/hebcal/**').as('holidays');
		cy.mockGeolocation();

		cy.visit('/');
		cy.wait('@holidays');
		cy.contains('Is It Shabbat');
	});
});
