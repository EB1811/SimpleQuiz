const initState = {
    quizzes: []
}

const quizReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_QUIZ':
            console.log("Success", action.quiz)
            return state;
        case 'CREATE_QUIZ_FAILED':
            console.log("Error ", action.err)
            return state
        default:
            return state;
    }
}

export default quizReducer;