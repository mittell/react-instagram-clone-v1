import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import LoggedInUserContext from '../context/logged-in-user';
import usePhotos from '../hooks/use-photos';
import Post from './post';

export default function Timeline() {
	const { user } = useContext(LoggedInUserContext);
	const { photos } = usePhotos(user);

	return (
		<div className='col-span-3 md:col-span-2'>
			{!photos ? (
				<Skeleton count={1} width={640} height={500} className='mb-5' />
			) : (
				photos.map((content) => <Post key={content.docId} content={content} />)
			)}
		</div>
	);
}
