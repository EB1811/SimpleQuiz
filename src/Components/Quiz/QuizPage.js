import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import ResultsPage from './ResultsPage';
import Nav from '../Layout/Nav';
import { NavLink } from 'react-router-dom';

class QuizPage extends Component {

    state = {
        currentQuestionIndex: 0,
        answer: '',
        anwerSubmitted: false,
        correctAnswer: true,
        correctSubmit: false,
        finishQuiz: false,
        correctAnswers: 0
    }

    getNextQuestion = (quiz) => {
        if(quiz.question.length > this.state.currentQuestionIndex) {
            if(this.state.answer === quiz.question[this.state.currentQuestionIndex].answer) {
                this.setState({ 
                    correctSubmit: true,
                    correctAnswers: this.state.correctAnswers + 1,
                    anwerSubmitted: true
                });

                // Waits 2 seconds.
                setTimeout(() => {
                    this.setState({ 
                        currentQuestionIndex: this.state.currentQuestionIndex + 1,
                        answer: '',
                        correctSubmit: false,
                        anwerSubmitted: false
                    });
                }, 1000);
            }
            else {
                this.setState({ 
                    correctAnswer: false,
                    anwerSubmitted: true
                });
                // Waits 2 seconds.
                setTimeout(() => {
                    this.setState({ 
                        currentQuestionIndex: this.state.currentQuestionIndex + 1,
                        correctAnswer: true,
                        answer: '',
                        anwerSubmitted: false
                    });
                }, 1000);
            }
        }
    }

    submitQuiz = () => {
        this.setState({
            finishQuiz: true
        })
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();

        if(this.props.quiz.question.length > this.state.currentQuestionIndex) {
            if(this.state.anwerSubmitted !== true) {
                this.getNextQuestion(this.props.quiz);
            }
        } else {
            this.submitQuiz();
        }
        //console.log(this.props.quiz.question);
    }

    render() {
        const { quiz } = this.props;

        if(quiz) {
            if(this.state.finishQuiz === false) {
                return (
                    <div>
                        <Nav/>
                        <NavLink to='/Dashboard'>
                            <div className="backButton btn-floating btn-large waves-effect hoverable waves-light deep-purple">
                                { /* eslint-disable-next-line */ }
                                <i className="material-icons">arrow_back</i>
                            </div>
                        </NavLink>

                        <h3 className="title quizTitleSize">
                            { quiz.question.length > this.state.currentQuestionIndex 
                            ? quiz.question[this.state.currentQuestionIndex].question
                            : 'End of quiz' }
                        </h3>

                        <div className="valign-wrapper">
                            <div className="container">
                                <form onSubmit={this.handleSubmit} className="">
                                    <div className="row">
                                        <div className="col s6 offset-s3">
                                            { quiz.question.length > this.state.currentQuestionIndex 
                                            ?
                                            <div className="input-field">
                                                <label htmlFor="answer">Answer</label>
                                                <input type="text" id="answer" onChange={this.handleChange} value={this.state.answer}/>
                                            </div>
                                            : null }
                                        </div>
                                        <div className="col s3">
                                            { this.state.correctAnswer === false ? <i className="material-icons medium red">clear</i> : null } 
                                            { this.state.correctSubmit === true ? <i className="material-icons medium green">check</i> : null }
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="input-field center">
                                            { /* If there are questions left: */}
                                            { quiz.question.length > this.state.currentQuestionIndex 
                                            ? <button className="btn-large hoverable deep-purple">Submit Answer</button>
                                            : <button className="btn-large hoverable deep-purple"> Finish Quiz </button> }
                                            
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <ResultsPage correctNum={this.state.correctAnswers} questionsNum={quiz.question.length}/>
                )
            }
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
