import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';

export default function Header({
	photosCount,
	profile,
	followerCount,
	setFollowerCount,
}) {
	const { user } = useUser();
	const [isFollowingProfile, setIsFollowingProfile] = useState(false);

	return null;
}

Header.propTypes = {
	photosCount: PropTypes.number.isRequired,
	followerCount: PropTypes.number.isRequired,
	setFollowerCount: PropTypes.func.isRequired,
	profile: PropTypes.shape({
		docId: PropTypes.string,
		userId: PropTypes.string,
		fullName: PropTypes.string,
		following: PropTypes.array,
	}).isRequired,
};
