/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-unnecessary-act */

import React from 'react';
import {
	render,
	waitFor,
	fireEvent,
	getAllByText,
	getByAltText,
} from '@testing-library/react';
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

			const firebase = {
				firestore: jest.fn(() => ({
					collection: jest.fn(() => ({
						doc: jest.fn(() => ({
							update: jest.fn(() => Promise.resolve('User added')),
						})),
					})),
				})),
			};

			const fieldValues = {
				arrayUnion: jest.fn(),
				arrayRemove: jest.fn(),
			};

			const { getByText, getByTitle, getAllByText, getByAltText, getByTestId } =
				render(
					<Router>
						:
						<FirebaseContext.Provider
							value={{ firebase, FieldValue: fieldValues }}
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
});
