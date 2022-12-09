/* eslint-disable no-plusplus */
export function seedDatabase(firebase) {
	const users = [
		{
			userId: 'nt3A9ZGRiqPShndOs3SJmlX6tk63',
			username: 'chris',
			fullName: 'Chris Mittell',
			emailAddress: 'cmittell@gmail.com',
			following: ['2'],
			followers: ['2', '3', '4'],
			dateCreated: Date.now(),
		},
		{
			userId: 'hqfv3JJe5ZQ494CiYBRNDZS5Qh63',
			username: 'demo',
			fullName: 'Demo User',
			emailAddress: 'demo@instasnap.com',
			following: [],
			followers: ['nt3A9ZGRiqPShndOs3SJmlX6tk63'],
			dateCreated: Date.now(),
		},
		{
			userId: '2',
			username: 'adam',
			fullName: 'Adam Smyth',
			emailAddress: 'admans@instasnap.com',
			following: [],
			followers: ['nt3A9ZGRiqPShndOs3SJmlX6tk63'],
			dateCreated: Date.now(),
		},
		{
			userId: '3',
			username: 'hannah',
			fullName: 'Hannah Thompson',
			emailAddress: 'hannaht@instasnap.com',
			following: [],
			followers: ['nt3A9ZGRiqPShndOs3SJmlX6tk63'],
			dateCreated: Date.now(),
		},
		{
			userId: '4',
			username: 'jane',
			fullName: 'Jane Owens',
			emailAddress: 'janeo@instasnap.com',
			following: [],
			followers: ['nt3A9ZGRiqPShndOs3SJmlX6tk63'],
			dateCreated: Date.now(),
		},
		{
			userId: '5',
			username: 'lin',
			fullName: 'Lin Chen',
			emailAddress: 'linc@instasnap.com',
			following: [],
			followers: ['nt3A9ZGRiqPShndOs3SJmlX6tk63'],
			dateCreated: Date.now(),
		},
		{
			userId: '6',
			username: 'robert',
			fullName: 'Rob Goyer',
			emailAddress: 'robg@instasnap.com',
			following: [],
			followers: ['nt3A9ZGRiqPShndOs3SJmlX6tk63'],
			dateCreated: Date.now(),
		},
		{
			userId: '7',
			username: 'simeon',
			fullName: 'Simeon Patric',
			emailAddress: 'simeonp@instasnap.com',
			following: [],
			followers: ['nt3A9ZGRiqPShndOs3SJmlX6tk63'],
			dateCreated: Date.now(),
		},
		{
			userId: '8',
			username: 'sarah',
			fullName: 'Sarah Zellis',
			emailAddress: 'sarahz@instasnap.com',
			following: [],
			followers: ['nt3A9ZGRiqPShndOs3SJmlX6tk63'],
			dateCreated: Date.now(),
		},
	];

	// eslint-disable-next-line prefer-const
	for (let k = 0; k < users.length; k++) {
		firebase.firestore().collection('users').add(users[k]);
	}

	// eslint-disable-next-line prefer-const
	for (let i = 1; i <= 3; ++i) {
		firebase
			.firestore()
			.collection('photos')
			.add({
				photoId: i,
				userId: 'nt3A9ZGRiqPShndOs3SJmlX6tk63',
				imageSrc: `/images/users/chris/${i}.jpg`,
				caption: 'This is a photo I have taken...',
				likes: [],
				comments: [
					{
						displayName: 'jim',
						comment: 'Nice photo!',
					},
					{
						displayName: 'george',
						comment: 'Would you mind if I used this picture?',
					},
				],
				userLatitude: '40.7128°',
				userLongitude: '74.0060°',
				dateCreated: Date.now(),
			});

		firebase
			.firestore()
			.collection('photos')
			.add({
				photoId: i,
				userId: '2',
				imageSrc: `/images/users/adam/${i}.jpg`,
				caption: 'This is a photo I have taken...',
				likes: [],
				comments: [
					{
						displayName: 'jim',
						comment: 'Nice photo!',
					},
					{
						displayName: 'george',
						comment: 'Would you mind if I used this picture?',
					},
				],
				userLatitude: '40.7128°',
				userLongitude: '74.0060°',
				dateCreated: Date.now(),
			});

		firebase
			.firestore()
			.collection('photos')
			.add({
				photoId: i,
				userId: '3',
				imageSrc: `/images/users/hannah/${i}.jpg`,
				caption: 'This is a photo I have taken...',
				likes: [],
				comments: [
					{
						displayName: 'jim',
						comment: 'Nice photo!',
					},
					{
						displayName: 'george',
						comment: 'Would you mind if I used this picture?',
					},
				],
				userLatitude: '40.7128°',
				userLongitude: '74.0060°',
				dateCreated: Date.now(),
			});

		firebase
			.firestore()
			.collection('photos')
			.add({
				photoId: i,
				userId: '4',
				imageSrc: `/images/users/jane/${i}.jpg`,
				caption: 'This is a photo I have taken...',
				likes: [],
				comments: [
					{
						displayName: 'jim',
						comment: 'Nice photo!',
					},
					{
						displayName: 'george',
						comment: 'Would you mind if I used this picture?',
					},
				],
				userLatitude: '40.7128°',
				userLongitude: '74.0060°',
				dateCreated: Date.now(),
			});

		firebase
			.firestore()
			.collection('photos')
			.add({
				photoId: i,
				userId: '5',
				imageSrc: `/images/users/lin/${i}.jpg`,
				caption: 'This is a photo I have taken...',
				likes: [],
				comments: [
					{
						displayName: 'jim',
						comment: 'Nice photo!',
					},
					{
						displayName: 'george',
						comment: 'Would you mind if I used this picture?',
					},
				],
				userLatitude: '40.7128°',
				userLongitude: '74.0060°',
				dateCreated: Date.now(),
			});

		firebase
			.firestore()
			.collection('photos')
			.add({
				photoId: i,
				userId: '6',
				imageSrc: `/images/users/robert/${i}.jpg`,
				caption: 'This is a photo I have taken...',
				likes: [],
				comments: [
					{
						displayName: 'jim',
						comment: 'Nice photo!',
					},
					{
						displayName: 'george',
						comment: 'Would you mind if I used this picture?',
					},
				],
				userLatitude: '40.7128°',
				userLongitude: '74.0060°',
				dateCreated: Date.now(),
			});

		firebase
			.firestore()
			.collection('photos')
			.add({
				photoId: i,
				userId: '8',
				imageSrc: `/images/users/sarah/${i}.jpg`,
				caption: 'This is a photo I have taken...',
				likes: [],
				comments: [
					{
						displayName: 'jim',
						comment: 'Nice photo!',
					},
					{
						displayName: 'george',
						comment: 'Would you mind if I used this picture?',
					},
				],
				userLatitude: '40.7128°',
				userLongitude: '74.0060°',
				dateCreated: Date.now(),
			});
	}
}
