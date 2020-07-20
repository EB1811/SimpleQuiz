export const createQuiz = (quiz) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // Using thump to return function instead of standard object containing actionType.
        // Make async call to database.
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorID = getState().firebase.auth.uid;

        firestore.collection('quizzes').add({
            ...quiz,
            author: profile.username,
            authorID: authorID,
            dateCreated: new Date()
        }).then(() => {
            dispatch({type: 'CREATE_QUIZ', quiz: quiz});
        }).catch((err) => {
            dispatch({type: 'CREATE_QUIZ_FAILED', err})
        })
    }
};