export const createQuiz = (quiz) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // Using thump to return function instead of standard object containing actionType.
        // Make async call to database.
        const firestore = getFirestore();
        firestore.collection('quizzes').add({
            ...quiz,
            author: "eman",
            authorID: 1,
            dateCreated: new Date()
        }).then(() => {
            dispatch({type: 'CREATE_QUIZ', quiz: quiz});
        }).catch((err) => {
            dispatch({type: 'CREATE_QUIZ_FAILED', err})
        })
    }
};