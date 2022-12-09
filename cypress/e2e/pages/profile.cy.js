/* eslint-disable no-undef */
describe('Profile', () => {
	beforeEach(() => {
		cy.visit(`${Cypress.config('baseUrl')}/p/adam`);
	});

	it('goes to a profile page and validates the UI', () => {
		cy.get('body').within(() => {
			cy.get('div').should('contain.text', 'adam');
			cy.get('div').should('contain.text', 'Adam Smyth');
			cy.get('div').should('contain.text', '3 Photos');
			cy.get('div').should('contain.text', '1 Follower');
			cy.get('div').should('contain.text', '0 Following');
		});
	});
});
