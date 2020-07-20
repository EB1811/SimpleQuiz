import authReducer from './authReducer';
import quizReducer from './quizReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    quizzes: quizReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer;