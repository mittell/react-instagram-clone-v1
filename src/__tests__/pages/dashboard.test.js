/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-unnecessary-act */

import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Dashboard from '../../pages/dashboard';
import UserContext from '../../context/user';
import FirebaseContext from '../../context/firebase';
import LoggedInUserContext from '../../context/logged-in-user';
import userFixture from '../../fixtures/logged-in-user';
import photosFixture from '../../fixtures/timeline-photos';
import suggestedProfilesFixture from '../../fixtures/suggested-profiles';
import { getPhotos, getSuggestedProfiles } from '../../services/firebase';
import useUser from '../../hooks/use-user';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: () => ({ username: 'orwell' }),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}));

jest.mock('../../services/firebase');
jest.mock('../../hooks/use-user');

describe('<Dashboard/>', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders the dashboard with a user profile and follows a user from the suggested profile sidebar', async () => {
		await act(async () => {
			getPhotos.mockImplementation(() => photosFixture);
			getSuggestedProfiles.mockImplementation(() => suggestedProfilesFixture);
			useUser.mockImplementation(() => ({ user: userFixture }));

			const { getByText, getByTitle, getAllByText, getByAltText, getByTestId } =
				render(
					<Router>
						<FirebaseContext.Provider
							value={{
								firebase: {
									firestore: jest.fn(() => ({
										collection: jest.fn(() => ({
											doc: jest.fn(() => ({
												update: jest.fn(() => Promise.resolve('User added')),
											})),
										})),
									})),
								},
								FieldValue: {
									arrayUnion: jest.fn(),
									arrayRemove: jest.fn(),
								},
							}}
						>
							<UserContext.Provider
								value={{
									user: {
										uid: 'vUqzGYXQ5xVCOaSWKctImtyiC5v1',
										displayName: 'User',
									},
								}}
							>
								<LoggedInUserContext.Provider value={{ user: userFixture }}>
									<Dashboard
										user={{
											uid: 'vUqzGYXQ5xVCOaSWKctImtyiC5v1',
											displayName: 'User',
										}}
									/>
								</LoggedInUserContext.Provider>
							</UserContext.Provider>
						</FirebaseContext.Provider>
					</Router>
				);

			await waitFor(() => {
				expect(document.title).toEqual('Instasnap');
				expect(getByTitle('Sign Out')).toBeTruthy();
				expect(getAllByText('raphael')).toBeTruthy();
				expect(getByAltText('Instasnap')).toBeTruthy();
				expect(getByAltText('user profile')).toBeTruthy();
				expect(getAllByText('Saint George and the Dragon')).toBeTruthy();
				expect(getByText('Suggestions for you')).toBeTruthy();

				fireEvent.click(getByText('Follow'));
				fireEvent.click(getByTestId('like-photo-494LKmaF03bUcYZ4xhNu'));
				fireEvent.keyDown(getByTestId('like-photo-494LKmaF03bUcYZ4xhNu'), {
					key: 'Enter',
				});
				fireEvent.click(getByTestId('focus-input-494LKmaF03bUcYZ4xhNu'));

				fireEvent.change(getByTestId('add-comment-494LKmaF03bUcYZ4xhNu'), {
					target: { value: 'Comment' },
				});
				fireEvent.submit(
					getByTestId('add-comment-submit-494LKmaF03bUcYZ4xhNu')
				);

				fireEvent.change(getByTestId('add-comment-494LKmaF03bUcYZ4xhNu'), {
					target: { value: '' },
				});
				fireEvent.keyDown(getByTestId('focus-input-494LKmaF03bUcYZ4xhNu'), {
					key: 'Enter',
				});
				fireEvent.submit(
					getByTestId('add-comment-submit-494LKmaF03bUcYZ4xhNu')
				);
			});
		});
	});

	it('renders the dashboard with a user profile of undefined to trigger fallbacks', async () => {
		await act(async () => {
			getPhotos.mockImplementation(() => photosFixture);
			getSuggestedProfiles.mockImplementation(() => suggestedProfilesFixture);
			useUser.mockImplementation(() => ({ user: undefined }));

			const { getByText } = render(
				<Router>
					<FirebaseContext.Provider
						value={{
							firebase: {
								auth: jest.fn(() => ({
									signOut: jest.fn(() => ({
										updateProfile: jest.fn(() => Promise.resolve({})),
									})),
								})),
							},
						}}
					>
						<UserContext.Provider
							value={{
								user: {
									uid: 'vUqzGYXQ5xVCOaSWKctImtyiC5v1',
									displayName: 'User',
								},
							}}
						>
							<LoggedInUserContext.Provider value={{ user: userFixture }}>
								<Dashboard
									user={{
										uid: 'vUqzGYXQ5xVCOaSWKctImtyiC5v1',
										displayName: 'User',
									}}
								/>
							</LoggedInUserContext.Provider>
						</UserContext.Provider>
					</FirebaseContext.Provider>
				</Router>
			);

			expect(getByText('Login')).toBeTruthy();
			expect(getByText('Sign Up')).toBeTruthy();
		});
	});

	it('renders the dashboard with a user profile and has no suggested profile', async () => {
		await act(async () => {
			getPhotos.mockImplementation(() => photosFixture);
			getSuggestedProfiles.mockImplementation(() => []);
			useUser.mockImplementation(() => ({ user: userFixture }));

			const { queryByText } = render(
				<Router>
					<FirebaseContext.Provider
						value={{
							firebase: {
								firestore: jest.fn(() => ({
									collection: jest.fn(() => ({
										doc: jest.fn(() => ({
											update: jest.fn(() => Promise.resolve('User added')),
										})),
									})),
								})),
							},
							FieldValue: {
								arrayUnion: jest.fn(),
								arrayRemove: jest.fn(),
							},
						}}
					>
						<UserContext.Provider
							value={{
								user: {
									uid: 'vUqzGYXQ5xVCOaSWKctImtyiC5v1',
									displayName: 'User',
								},
							}}
						>
							<LoggedInUserContext.Provider value={{ user: userFixture }}>
								<Dashboard
									user={{
										uid: 'vUqzGYXQ5xVCOaSWKctImtyiC5v1',
										displayName: 'User',
									}}
								/>
							</LoggedInUserContext.Provider>
						</UserContext.Provider>
					</FirebaseContext.Provider>
				</Router>
			);

			await waitFor(() => {
				expect(queryByText('Suggestions for you')).toBeFalsy();
			});
		});
	});
});
