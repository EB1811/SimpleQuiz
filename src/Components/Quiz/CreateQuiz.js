import React, { Component } from "react";
import { connect } from "react-redux";
import { createQuiz } from "../../Store/Actions/quizActions";
import Question from "./Question";
import { Redirect } from "react-router-dom";
import Nav from "../Layout/Nav";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

// Motion variant.
// Parent.
const animateVariants = {
    start: {
        opacity: 0,
        x: 1000,
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
        },
    },
    exit: {
        x: 1000,
        opacity: 0,
        transition: {
            type: "spring",
            stiffness: 1000,
            damping: 55,
        },
    },
};
const animateVariants2 = {
    start: {
        opacity: 0,
        x: 1000,
    },
    finish: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            mass: 0.4,
            stiffness: 1000,
            damping: 100,
        },
    },
};

class CreateQuiz extends Component {
    state = {
        title: "",
        category: "",
        questions: [],
        currentQuestion: "",
        currentAnswer: "",
        currentStage: 0,
        titleError: false,
        questionError: false,
    };

    // Create question / answer button function.
    addQuestion = () => {
        if (this.state.currentQuestion && this.state.currentAnswer) {
            const newQuestion = {
                id:
                    this.state.questions.length *
                        1 *
                        this.state.currentQuestion.length *
                        this.state.currentAnswer.length +
                    Math.floor(
                        Math.random() *
                            Math.floor(
                                this.state.currentQuestion.length *
                                    25 *
                                    (this.state.currentAnswer.length * 25) *
                                    50
                            )
                    ),
                question: this.state.currentQuestion,
                answer: this.state.currentAnswer,
            };

            this.setState({
                currentQuestion: "",
                currentAnswer: "",
            });
            this.setState({
                questions: [...this.state.questions, newQuestion],
            });
        }
    };

    delQuestion = (question) => {
        var newQuestions = this.state.questions.filter(function (el) {
            return el.id !== question.id;
        });
        //console.log(newQuestions);
        this.setState({ questions: newQuestions });
        //console.log(this.state.questions);
    };

    nextStage = () => {
        if (this.state.title) {
            this.setState({ titleError: false });
            if (this.state.currentStage < 2) {
                this.setState({
                    currentStage: this.state.currentStage + 1,
                });
            }
        } else {
            this.setState({ titleError: true });
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state);
        if (this.state.questions.length > 0) {
            const newQuiz = {
                title: this.state.title,
                category: this.state.category,
                question: this.state.questions,
            };

            // Calls function in quizAction.
            this.setState({ questionError: false });
            this.props.createQuiz(newQuiz);
            this.props.history.push("/");
        } else {
            this.setState({ questionError: true });
        }
    };

    render() {
        const { authStatus } = this.props;

        if (authStatus.isLoaded) {
            // Route guarding
            if (!authStatus.uid)
                return (
                    <motion.div exit='undefined'>
                        {" "}
                        <Redirect to='/login' />{" "}
                    </motion.div>
                );
            if (this.state.currentStage === 0) {
                return (
                    <motion.div
                        variants={animateVariants}
                        initial='start'
                        animate='finish'
                        exit='exit'
                    >
                        <Nav />
                        <NavLink to='/'>
                            <div className='backButton btn-floating btn-large waves-effect hoverable waves-light deep-purple'>
                                {/* eslint-disable-next-line */}
                                <i className='material-icons'>arrow_back</i>
                            </div>
                        </NavLink>
                        <div className='valign-wrapper'>
                            <h1
                                className='title'
                                style={{ marginTop: "50px", marginBottom: 0 }}
                            >
                                Title
                            </h1>
                            <div className='container'>
                                <div>
                                    <div className='row'>
                                        <div className='col s6 offset-s3'>
                                            <div className='input-field'>
                                                <input
                                                    required
                                                    type='text'
                                                    id='title'
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col s12 center'>
                                            <button
                                                type='button'
                                                onClick={this.nextStage}
                                                className='btn-large hoverable deep-purple'
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                    <div className='red-text row'>
                                        <div className='col s12 center'>
                                            {this.state.titleError ? (
                                                <h5>Invalid Title</h5>
                                            ) : (
                                                <h5>&nbsp;</h5>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            } else if (
                this.state.currentStage === 1 &&
                !this.state.titleError
            ) {
                return (
                    <motion.div
                        variants={animateVariants}
                        initial='start'
                        animate='finish'
                        exit='exit'
                    >
                        <Nav />
                        <NavLink to='/'>
                            <div className='backButton btn-floating btn-large waves-effect hoverable waves-light deep-purple'>
                                {/* eslint-disable-next-line */}
                                <i className='material-icons'>arrow_back</i>
                            </div>
                        </NavLink>
                        <motion.div
                            className='valign-wrapper'
                            variants={animateVariants2}
                            initial='start'
                            animate='finish'
                        >
                            <div className='container'>
                                <form onSubmit={this.handleSubmit} className=''>
                                    <div className='row'>
                                        <div className='col s12 center'>
                                            <h1 className='createQuizTitle'>
                                                Questions
                                            </h1>
                                        </div>
                                    </div>
                                    <div className='row areaMargin'>
                                        <div className='row noBottomMargin'>
                                            <div className='col s6 offset-s3'>
                                                <Question
                                                    questions={
                                                        this.state.questions
                                                    }
                                                    delQuestion={
                                                        this.delQuestion
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className='row noBottomMargin'>
                                            <div className='col s5 offset-s1'>
                                                <div className='input-field'>
                                                    <label htmlFor='question'>
                                                        Qustion
                                                    </label>
                                                    <input
                                                        type='text'
                                                        id='currentQuestion'
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                        value={
                                                            this.state
                                                                .currentQuestion
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className='col s5'>
                                                <div className='input-field'>
                                                    <label htmlFor='answer'>
                                                        Answer
                                                    </label>
                                                    <input
                                                        type='text'
                                                        id='currentAnswer'
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                        value={
                                                            this.state
                                                                .currentAnswer
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className='col s6 offset-s3 center'>
                                                <button
                                                    type='button'
                                                    onClick={this.addQuestion}
                                                    className='btn-large btn2 hoverable deep-purple'
                                                >
                                                    Add Question
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='input-field center'>
                                            <button className='btn-large hoverable deep-purple'>
                                                Create Quiz
                                            </button>
                                        </div>
                                    </div>
                                    <div className='red-text row'>
                                        <div className='col s12 center'>
                                            {this.state.questionError ? (
                                                <h5>
                                                    Must have at least 1
                                                    question
                                                </h5>
                                            ) : (
                                                <h5>&nbsp;</h5>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                );
            }
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        authStatus: state.firebase.auth,
    };
};
// Dispatch function.
const mapDispatchToProps = (dispatch) => {
    return {
        createQuiz: (quiz) => dispatch(createQuiz(quiz)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuiz);
