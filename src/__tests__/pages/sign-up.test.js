/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-unnecessary-act */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import SignUp from '../../pages/sign-up';
import FirebaseContext from '../../context/firebase';
import { doesUsernameExist } from '../../services/firebase';
import * as ROUTES from '../../constants/routes';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}));

jest.mock('../../services/firebase');

describe('<SignUp />', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders the sign up page with a form submission and signs a user up', async () => {
		const firebase = {
			firestore: jest.fn(() => ({
				collection: jest.fn(() => ({
					add: jest.fn(() => Promise.resolve('User added')),
				})),
			})),
			auth: jest.fn(() => ({
				createUserWithEmailAndPassword: jest.fn(() => ({
					user: {
						updateProfile: jest.fn(() => Promise.resolve('I am signed up!')),
					},
				})),
			})),
		};

		const { getByTestId, getByPlaceholderText, queryByTestId } = render(
			<Router>
				<FirebaseContext.Provider value={{ firebase }}>
					<SignUp />
				</FirebaseContext.Provider>
			</Router>
		);

		await act(async () => {
			doesUsernameExist.mockImplementation(() => Promise.resolve(true)); // as true but inverse in the code

			await fireEvent.change(getByPlaceholderText('Username'), {
				target: { value: 'user' },
			});

			await fireEvent.change(getByPlaceholderText('Full Name'), {
				target: { value: 'User' },
			});

			await fireEvent.change(getByPlaceholderText('Email address'), {
				target: { value: 'user@email.com' },
			});

			await fireEvent.change(getByPlaceholderText('Password'), {
				target: { value: 'password' },
			});

			fireEvent.submit(getByTestId('sign-up'));

			expect(document.title).toEqual('Sign Up - Instasnap');
			await expect(doesUsernameExist).toHaveBeenCalled();
			await expect(doesUsernameExist).toHaveBeenCalledWith('user');

			await waitFor(() => {
				expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.DASHBOARD);
				expect(getByPlaceholderText('Username').value).toBe('user');
				expect(getByPlaceholderText('Full Name').value).toBe('User');
				expect(getByPlaceholderText('Email address').value).toBe(
					'user@email.com'
				);
				expect(getByPlaceholderText('Password').value).toBe('password');
				expect(queryByTestId('error')).toBeFalsy();
			});
		});
	});

	it('renders the sign up page but an error is present (username exists)', async () => {
		const firebase = {
			auth: jest.fn(() => ({
				createUserWithEmailAndPassword: jest.fn(() => ({
					user: {
						updateProfile: jest.fn(() => Promise.resolve({})),
					},
				})),
			})),
		};

		const { getByTestId, getByPlaceholderText, queryByTestId } = render(
			<Router>
				<FirebaseContext.Provider value={{ firebase }}>
					<SignUp />
				</FirebaseContext.Provider>
			</Router>
		);

		await act(async () => {
			doesUsernameExist.mockImplementation(() => Promise.resolve([false])); // as true but inverse in the code

			await fireEvent.change(getByPlaceholderText('Username'), {
				target: { value: 'user' },
			});

			await fireEvent.change(getByPlaceholderText('Full Name'), {
				target: { value: 'User' },
			});

			await fireEvent.change(getByPlaceholderText('Email address'), {
				target: { value: 'user@email.com' },
			});

			await fireEvent.change(getByPlaceholderText('Password'), {
				target: { value: 'password' },
			});

			fireEvent.submit(getByTestId('sign-up'));

			expect(document.title).toEqual('Sign Up - Instasnap');
			await expect(doesUsernameExist).toHaveBeenCalled();
			await expect(doesUsernameExist).toHaveBeenCalledWith('user');

			await waitFor(() => {
				expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
				expect(getByPlaceholderText('Username').value).toBe('');
				// expect(getByPlaceholderText('Full Name').value).toBe('');
				// expect(getByPlaceholderText('Email address').value).toBe('');
				// expect(getByPlaceholderText('Password').value).toBe('');
				expect(queryByTestId('error')).toBeTruthy();
			});
		});
	});

	it('renders the sign up page but an error is thrown', async () => {
		const firebase = {
			auth: jest.fn(() => ({
				createUserWithEmailAndPassword: jest.fn(() => ({
					user: {
						updateProfile: jest.fn(() =>
							Promise.reject(new Error('Username exists'))
						),
					},
				})),
			})),
		};

		const { getByTestId, getByPlaceholderText, queryByTestId } = render(
			<Router>
				<FirebaseContext.Provider value={{ firebase }}>
					<SignUp />
				</FirebaseContext.Provider>
			</Router>
		);

		await act(async () => {
			doesUsernameExist.mockImplementation(() => Promise.resolve(false)); // as true but inverse in the code

			await fireEvent.change(getByPlaceholderText('Username'), {
				target: { value: 'user' },
			});

			await fireEvent.change(getByPlaceholderText('Full Name'), {
				target: { value: 'User' },
			});

			await fireEvent.change(getByPlaceholderText('Email address'), {
				target: { value: 'user@email.com' },
			});

			await fireEvent.change(getByPlaceholderText('Password'), {
				target: { value: 'password' },
			});

			fireEvent.submit(getByTestId('sign-up'));

			expect(document.title).toEqual('Sign Up - Instasnap');
			await expect(doesUsernameExist).toHaveBeenCalled();
			await expect(doesUsernameExist).toHaveBeenCalledWith('user');

			await waitFor(() => {
				expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
				expect(getByPlaceholderText('Username').value).toBe('');
				expect(getByPlaceholderText('Full Name').value).toBe('');
				expect(getByPlaceholderText('Email address').value).toBe('');
				expect(getByPlaceholderText('Password').value).toBe('');
				expect(queryByTestId('error')).toBeTruthy();
			});
		});
	});
});
