import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const QuizPage = (props) => {
    const { quiz } = props
    if(quiz) {
        return (
            <div>
                title: {quiz.title}
            </div>
        )
    } else {
        return (
            // Have to create quiz page yourself l0l
            <div className="container center">
                <p>Loading Quiz...</p>
            </div>
        )
    }
}

// Returns what we want to attatch to our props (from redux store).
const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const quizzes = state.firestore.data.quizzes;
    const quiz = quizzes ? quizzes[id] : null;
    return {
        quiz: quiz
    }
}

// Higher order functions allows connection to redux store and Firestore database.
export default compose(
    connect(mapStateToProps),
    firestoreConnect(props =>[
        // Gets doc in collection 'quizzes' that have the id in props.
        { collection: 'quizzes', doc: props.match.params.id }
    ])
)(QuizPage)
