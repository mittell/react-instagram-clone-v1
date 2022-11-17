import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserPhotosByUserId } from '../../services/firebase';

import Header from './header';
import Photos from './photos';

export default function UserProfile({ user }) {
	const reducer = (state, newState) => ({ ...state, ...newState });
	const initialState = {
		profile: {},
		photosCollection: [],
		followersCount: 0,
	};

	const [{ profile, photosCollection, followers }, dispatch] = useReducer(
		reducer,
		initialState
	);

	useEffect(() => {
		async function getProfileInfoAndPhotos() {
			const photos = await getUserPhotosByUserId(user.userId);

			dispatch({
				profile: user,
				photosCollection: photos,
				followerCount: user.followers.length,
			});
		}

		if (user.username) {
			getProfileInfoAndPhotos();
		}
	}, [user]);

	return (
		<>
			<Header />
			<Photos photos={photosCollection} />
			<p>Hello {user.username}</p>
		</>
	);
}

UserProfile.propTypes = {
	user: PropTypes.shape({
		dateCreated: PropTypes.number.isRequired,
		emailAddress: PropTypes.string.isRequired,
		followers: PropTypes.array.isRequired,
		following: PropTypes.array.isRequired,
		fullName: PropTypes.string.isRequired,
		userId: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
	}).isRequired,
};
