import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import ResultsPage from './ResultsPage';
import Nav from '../Layout/Nav';
import { motion } from 'framer-motion';

// Motion variant.
// Parent.
const animateVariants = {
    start: { 
        opacity: 0,
        x: 1000
    },
    finish: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            mass: 0.4,
            stiffness: 1000, 
            damping: 100,
            when: "beforeChildren",
        }
    },
    exit: {
        x: 1000,
        opacity: 0,
        transition: {
            type: "spring",
            stiffness: 1000, 
            damping: 55
        }
    }
}
const animateVariants3 = {
    start: { 
    },
    finish: {
    },
    exit: {
        x: 1000,
        opacity: 0,
        transition: {
            type: "spring",
            stiffness: 1000, 
            damping: 55
        }
    }
}

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

    // Framer Motion start animation for dashboard. 
    back = (value) => {
        this.props.history.push('/dashboard', { direction: value});
    }

    render() {
        const { quiz } = this.props;

        if(quiz) {
            if(this.state.finishQuiz === false) {
                return (
                    <motion.div
                        variants={animateVariants} initial="start" animate="finish" exit="exit"
                    >
                        <Nav/>
                        <button onClick={() => this.back(-1)} className="backButton btn-floating btn-large waves-effect hoverable waves-light deep-purple">
                            <i className="material-icons">arrow_back</i>
                        </button>

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
                    </motion.div>
                )
            } else {
                return (
                    <motion.div
                        variants={animateVariants3} initial="start" animate="finish" exit="exit"
                    >
                        <ResultsPage back={this.back} correctNum={this.state.correctAnswers} questionsNum={quiz.question.length}/>
                    </motion.div>
                )
            }
        } else {
            return (
                null
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
