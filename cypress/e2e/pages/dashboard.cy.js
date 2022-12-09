/* eslint-disable no-undef */
describe('Dashboard', () => {
	beforeEach(() => {
		cy.visit(`${Cypress.config('baseUrl')}/login`);

		cy.get('body').within(() => {
			cy.get('div').should('contain.text', 'Please login');
		});
		cy.get('div')
			.find('img')
			.should('be.visible')
			.should('have.attr', 'alt')
			.should('contain', 'iPhone with Instasnap');

		cy.get('form').within(() => {
			cy.get('input:first')
				.should('have.attr', 'placeholder', 'Email address')
				.type('demo@instasnap.com');
			cy.get('input:last')
				.should('have.attr', 'placeholder', 'Password')
				.type('demoUser');
			cy.get('button').should('contain.text', 'Login');
			cy.get('button').click();
		});

		cy.get('div')
			.find('img')
			.should('be.visible')
			.should('have.attr', 'alt')
			.should('contain', 'Instasnap');
	});

	it('logs the user in and shows the dashboard and does basic checks around the UI', () => {
		cy.get('body').within(() => {
			cy.get('div').should('contain.text', 'demo'); 
			cy.get('div').should('contain.text', 'Demo User');
			cy.get('div').should('contain.text', 'Suggestions for you'); 
		});
	});

	it('logs the user in and add a comment to a photo', () => {
		cy.get('[data-testid="add-comment-81KL9rBslzfq0KmqaxaL"]')
			.should('have.attr', 'placeholder', 'Add a comment...')
			.type('Amazing photo!');
		cy.get('[data-testid="add-comment-submit-81KL9rBslzfq0KmqaxaL"]').submit();
	});

	it('logs the user in and likes a photo', () => {
		cy.get('[data-testid="like-photo-81KL9rBslzfq0KmqaxaL"]').click();
	});

	it('logs the user in and then signs out', () => {
		cy.get('[data-testid="sign-out"]').click();
		cy.get('div').should('contain.text', 'Please login'); 
	});
});
