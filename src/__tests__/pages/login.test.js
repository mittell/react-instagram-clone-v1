/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../pages/login';
import FirebaseContext from '../../context/firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { act } from 'react-dom/test-utils';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}));

describe('<Login/>', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders the login page with a form submission and logs the user in', async () => {
		const succeedToLogin = jest.fn(() => Promise.resolve('I am signed in!'));
		const firebase = {
			auth: jest.fn(() => ({
				signInWithEmailAndPassword: succeedToLogin,
			})),
		};

		const { getByTestId, getByPlaceholderText, queryByTestId } = render(
			<Router>
				<FirebaseContext.Provider value={{ firebase }}>
					<Login />
				</FirebaseContext.Provider>
			</Router>
		);

		await act(async () => {
			expect(document.title).toEqual('Login - Instasnap');

			await fireEvent.change(getByPlaceholderText('Email address'), {
				target: { value: 'user@email.com' },
			});

			await fireEvent.change(getByPlaceholderText('Password'), {
				target: { value: 'test' },
			});

			await fireEvent.submit(getByTestId('login'));

			expect(succeedToLogin).toHaveBeenCalled();
			expect(succeedToLogin).toHaveBeenCalledWith('user@email.com', 'test');

			await waitFor(() => {
				expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.DASHBOARD);
				expect(getByPlaceholderText('Email address').value).toBe(
					'user@email.com'
				);
				expect(getByPlaceholderText('Password').value).toBe('test');
				expect(queryByTestId('error')).toBeFalsy();
			});
		});
	});

	it('renders the login page with a form submission and fails to login the user', async () => {
		const failedToLogin = jest.fn(() =>
			Promise.reject(new Error('Cannot sign in'))
		);
		const firebase = {
			auth: jest.fn(() => ({
				signInWithEmailAndPassword: failedToLogin,
			})),
		};

		const { getByTestId, getByPlaceholderText, queryByTestId } = render(
			<Router>
				<FirebaseContext.Provider value={{ firebase }}>
					<Login />
				</FirebaseContext.Provider>
			</Router>
		);

		await act(async () => {
			expect(document.title).toEqual('Login - Instasnap');

			await fireEvent.change(getByPlaceholderText('Email address'), {
				target: { value: 'user.com' },
			});

			await fireEvent.change(getByPlaceholderText('Password'), {
				target: { value: 'test' },
			});

			await fireEvent.submit(getByTestId('login'));

			expect(failedToLogin).toHaveBeenCalled();
			expect(failedToLogin).toHaveBeenCalledWith('user.com', 'test');

			await waitFor(() => {
				expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
				expect(getByPlaceholderText('Email address').value).toBe('');
				expect(getByPlaceholderText('Password').value).toBe('');
				expect(queryByTestId('error')).toBeTruthy();
			});
		});
	});
});
