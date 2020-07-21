import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class QuizPage extends Component {

    state = {
        currentQuestionIndex: 0,
        answer: '',
        correctAnswer: true
    }

    getNextQuestion = (quiz) => {
        if(quiz.question.length > this.state.currentQuestionIndex) {
            if(this.state.answer === quiz.question[this.state.currentQuestionIndex].answer) {
                this.setState({ 
                    currentQuestionIndex: this.state.currentQuestionIndex + 1,
                    answer: ''
                });
            }
            else {
                this.setState({ 
                    correctAnswer: false
                });
                // Waits 2 seconds.
                setTimeout(() => {
                    this.setState({ 
                        currentQuestionIndex: this.state.currentQuestionIndex + 1,
                        correctAnswer: true,
                        answer: ''
                    });
                }, 2000);
            }
        }
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.getNextQuestion(this.props.quiz);
        //console.log(this.props.quiz.question);
    }

    render() {
        const { quiz } = this.props;

        if(quiz) {
            return (
                <div className="container center">
                    <form onSubmit={this.handleSubmit} className="white">
                        <div className="row">
                            <h4 htmlFor="title">{quiz.title}</h4>
                            <h6 className="grey-text">{quiz.question.length} Questions</h6>
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
                                    <button className="btn pink lighten-1">Submit Answer</button>
                                </div>
                            </div>
                            <div className="red-text row left">
                                { this.state.correctAnswer === false ? <h5>Incorrect</h5> : null}
                            </div>
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
