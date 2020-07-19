export const createQuiz = (quiz) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // Using thump to return function instead of standard object containing actionType.
        // Make async call to database.
        const firestore = getFirestore();

        dispatch({type: 'CREATE_QUIZ', quiz: quiz})
    }
};