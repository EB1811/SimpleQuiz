import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Init firebase
const firebaseConfig = {
    apiKey: "AIzaSyAsGqdDvn4qvEXwadMUMR2T3JyhRG_4BGw",
    authDomain: "simplequiz-ae03b.firebaseapp.com",
    databaseURL: "https://simplequiz-ae03b.firebaseio.com",
    projectId: "simplequiz-ae03b",
    storageBucket: "simplequiz-ae03b.appspot.com",
    messagingSenderId: "93195446362",
    appId: "1:93195446362:web:192a0ea310e85a461ad063",
    measurementId: "G-HJT8PWNP6P"
};
firebase.initializeApp(firebaseConfig);

export default firebase;