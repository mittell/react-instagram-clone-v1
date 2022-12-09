const { defineConfig } = require('cypress');

module.exports = defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000',
		viewportHeight: 1000,
		viewportWidth: 1200,
		env: {
			login: '/login',
			signup: '/sign-up',
			dashboard: '/dashboard',
		},
	},
});
