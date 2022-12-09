/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-unnecessary-act */

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import NotFound from '../../pages/not-found';
import { getUserByUserId } from '../../services/firebase';
import userFixture from '../../fixtures/logged-in-user';
import { act } from 'react-dom/test-utils';

const firebase = {
	auth: jest.fn(() => ({
		createUserWithEmailAndPassword: jest.fn(() =>
			Promise.resolve({
				user: {
					updateProfile: jest.fn(() => Promise.resolve('I am signed up!')),
				},
			})
		),
	})),
};

jest.mock('../../services/firebase');

describe('<NotFound/>', () => {
	it('renders the not found page with a logged in user', async () => {
		await getUserByUserId.mockImplementation(() => [userFixture]);

		await act(async () => {
			const { queryByText } = render(
				<Router>
					<FirebaseContext.Provider value={{ firebase }}>
						<UserContext.Provider value={{ user: { uid: 1 } }}>
							<NotFound />
						</UserContext.Provider>
					</FirebaseContext.Provider>
				</Router>
			);

			await waitFor(() => {
				expect(queryByText('Log In')).toBeFalsy();
				expect(queryByText('Not Found!')).toBeTruthy();
			});
		});
	});

	it('renders the not found page with an anon user', async () => {
		await getUserByUserId.mockImplementation(() => []);

		await act(async () => {
			const { queryByText } = render(
				<Router>
					<FirebaseContext.Provider value={{ firebase }}>
						<UserContext.Provider value={{ user: {} }}>
							<NotFound />
						</UserContext.Provider>
					</FirebaseContext.Provider>
				</Router>
			);

			await waitFor(() => {
				expect(queryByText('Login')).toBeTruthy();
				expect(queryByText('Not Found!')).toBeTruthy();
			});
		});
	});
});
