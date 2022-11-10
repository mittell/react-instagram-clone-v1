import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// import { seedDatabase } from '../seed';

const config = {
	apiKey: process.env.REACT_APP_APIKEY,
	authDomain: process.env.REACT_APP_AUTHDOMAIN,
	databaseURL: process.env.REACT_APP_DATABASEURL,
	projectId: process.env.REACT_APP_PROJECTID,
	storageBucket: process.env.REACT_APP_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
	appId: process.env.REACT_APP_APPID,
};

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };
