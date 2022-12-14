import { useEffect } from 'react';
import PropTypes from 'prop-types';
import useUser from '../hooks/use-user';
import LoggedInUserContext from '../context/logged-in-user';

import Header from '../components/header';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar';

export default function Dashboard({ user: loggedInUser }) {
	const { user } = useUser(loggedInUser.uid);

	useEffect(() => {
		document.title = 'Instasnap';
	}, []);

	return (
		<LoggedInUserContext.Provider value={{ user }}>
			<div className='bg-gray-background'>
				<Header />
				<div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg px-4 lg:px-0'>
					<Timeline />
					<Sidebar />
				</div>
			</div>
		</LoggedInUserContext.Provider>
	);
}

Dashboard.propTypes = {
	user: PropTypes.object.isRequired,
};
