import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class QuizPage extends Component {

    state = {
        currentQuestionIndex: 0,
        answer: ''
    }

    getNextQuestion = (quiz) => {
        if(quiz.question.length > this.state.currentQuestionIndex) {
            if(this.state.answer == quiz.question[this.state.currentQuestionIndex].answer) {
                this.setState({ 
                    currentQuestionIndex: this.state.currentQuestionIndex + 1,
                    answer: ''
                });
            }
        } else {
        }
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state);
    }

    render() {
        const { quiz } = this.props;

        if(quiz) {
            return (
                <div className="container center">
                    <form onSubmit={this.handleSubmit} className="white">
                        <div className="row">
                            <h4 htmlFor="title">{quiz.title}</h4>
                        </div>

                        <div className="row">
                            <div className="row">
                                <h5 className="left" htmlFor="question">
                                    { quiz.question.length > this.state.currentQuestionIndex ? quiz.question[this.state.currentQuestionIndex].question
                                    : 'End of quiz' }
                                </h5>
                            </div>
                            <div className="row input-field">
                                <label htmlFor="answer">Answer</label>
                                <input type="text" id="answer" onChange={this.handleChange}/>
                            </div>
                            <div className="row">
                                <div className="left input-field">
                                    <button type="button" onClick={() => this.getNextQuestion(quiz)} className="btn pink lighten-1">Submit Answer</button>
                                </div>
                            </div>
                        </div>

                        <div className="input-field">
                            <button className="btn pink lighten-1">Finish Quiz</button>
                        </div>
                    </form>
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
