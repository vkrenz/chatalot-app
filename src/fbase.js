import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC30a44bdQHHaGUawMEm2EvZCTGtiWE-rU",
    authDomain: "auth-test-918a1.firebaseapp.com",
    projectId: "auth-test-918a1",
    storageBucket: "auth-test-918a1.appspot.com",
    messagingSenderId: "1084444097621",
    appId: "1:1084444097621:web:f67215a586d9d1a1fba8dc"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

export default app