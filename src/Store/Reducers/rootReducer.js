import authReducer from './authReducer';
import quizReducer from './quizReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
    auth: authReducer,
    quizzes: quizReducer,
    firestore: firestoreReducer
})

export default rootReducer;