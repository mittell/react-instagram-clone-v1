import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';
import UserContext from '../../context/user';

export default function Header({
	photosCount,
	profile: {
		docId: profileDocId,
		userId: profileUserId,
		fullName,
		following,
		followers,
		username: profileUsername,
	},
	followerCount,
	setFollowerCount,
}) {
	const { user: loggedInUser } = useContext(UserContext);
	const { user } = useUser(loggedInUser?.uid);
	const [isFollowingProfile, setIsFollowingProfile] = useState(false);
	const activeBtnFollow = user?.username && user?.username !== profileUsername;

	const handleToggleFollow = async () => {
		setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
		setFollowerCount({
			followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
		});

		await toggleFollow(
			isFollowingProfile,
			user.docId,
			profileDocId,
			profileUserId,
			user.userId
		);
	};

	useEffect(() => {
		const isLoggedInUserFollowingProfile = async () => {
			const isFollowing = await isUserFollowingProfile(
				user.username,
				profileUserId
			);
			setIsFollowingProfile(!!isFollowing);
		};

		if (user?.username && profileUserId) {
			isLoggedInUserFollowingProfile();
		}
	}, [user?.username, profileUserId]);

	return (
		<div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
			<div className='container flex justify-center items-center'>
				{profileUsername ? (
					<img
						className='rounded-full h-20 w-20 md:h-28 md:w-28 lg:h-40 lg:w-40 flex'
						alt={`${profileUsername} profile`}
						src={`/images/avatars/${profileUsername}.jpg`}
					/>
				) : (
					<img
						className='rounded-full h-20 w-20 md:h-28 md:w-28 lg:h-40 lg:w-40 flex'
						alt={`default profile`}
						src={`/images/avatars/default.png`}
					/>
				)}
			</div>
			<div className='flex items-center justify-center flex-col col-span-2'>
				<div className='container flex items-center'>
					<p className='text-2xl mr-4'>{profileUsername}</p>
					{activeBtnFollow && (
						<button
							className='bg-blue-medium font-bold text-sm text-white rounded w-20 h-8'
							type='button'
							onClick={handleToggleFollow}
							onKeyDown={(event) => {
								if (event.key === 'Enter') {
									handleToggleFollow();
								}
							}}
						>
							{isFollowingProfile ? 'Unfollow' : 'Follow'}
						</button>
					)}
				</div>
				<div className='container flex mt-4 flex-col lg:flex-row'>
					{!followers || !following ? (
						<Skeleton count={1} width={677} height={24} />
					) : (
						<>
							<p className='mr-10'>
								<span className='font-bold'>{photosCount}</span> Photos
							</p>
							<p className='mr-10'>
								<span className='font-bold'>{followerCount}</span>{' '}
								{followerCount === 1 ? 'Follower' : 'Followers'}
							</p>
							<p className='mr-10'>
								<span className='font-bold'>{following.length}</span> Following
							</p>
						</>
					)}
				</div>
				<div className='container mt-4'>
					<p className='font-medium'>
						{!fullName ? <Skeleton count={1} height={24} /> : fullName}
					</p>
				</div>
			</div>
		</div>
	);
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
		followers: PropTypes.array,
		username: PropTypes.string,
	}).isRequired,
};
