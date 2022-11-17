import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';

import UserProfile from '../components/profile';
import Header from '../components/header';

export default function Profile() {
	const { username } = useParams();
	const [user, setUser] = useState(null);
	const history = useHistory();

	useEffect(() => {
		async function checkUserExists() {
			const userData = await getUserByUsername(username);

			if (userData.length > 0) {
				setUser(userData[0]);
			} else {
				history.push(ROUTES.NOT_FOUND);
			}
		}

		checkUserExists();
	}, [username, history]);

	return user?.username ? (
		<div className='bg-gray-background'>
			<Header />
			<div className='mx-auto max-w-screen-lg'>
				<UserProfile user={user} />
			</div>
		</div>
	) : null;
}
