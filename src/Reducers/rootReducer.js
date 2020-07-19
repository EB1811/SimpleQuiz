import authReducer from './authReducer';
import quizReducer from './quizReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    quizzes: quizReducer
})

export default rootReducer;