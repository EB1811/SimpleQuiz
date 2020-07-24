import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createQuiz } from '../../Store/Actions/quizActions';
import Question from './Question';
import { Redirect } from 'react-router-dom';
import Nav from '../Layout/Nav';
import { NavLink } from 'react-router-dom';

class CreateQuiz extends Component {

    state = {
        title: '',
        questions: [],
        currentQuestion: '',
        currentAnswer: '',
        currentStage: 0
    }

    // Create question / answer button function.
    addQuestion = () => {
        if(this.state.currentQuestion && this.state.currentAnswer) {
            const newQuestion = {
                id: this.state.questions.length + 1,
                question: this.state.currentQuestion,
                answer: this.state.currentAnswer
            }

            this.setState({ questions: [...this.state.questions, newQuestion]});
            //console.log(this.state)
        }
    }

    nextStage = () => {
        if(this.state.currentStage < 2) {
            this.setState({ 
                currentStage: this.state.currentStage + 1
            });
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
        const newQuiz = {
            title: this.state.title,
            question: this.state.questions
        }

        // Calls function in quizAction.
        this.props.createQuiz(newQuiz)
        this.props.history.push('/')
    }

    render() {
        const { authStatus } = this.props;

        if(authStatus.isLoaded) {
        // Route guarding
        if(!authStatus.uid) return <Redirect to='/login' />
            if(this.state.currentStage === 0) {
                return (
                    <div>
                        <Nav/>
                        <NavLink to='/'>
                            <div className="backButton btn-floating btn-large waves-effect hoverable waves-light deep-purple">
                                { /* eslint-disable-next-line */ }
                                <i className="material-icons">arrow_back</i>
                            </div>
                        </NavLink>
                        <div className="valign-wrapper">
                            <h1 className="title">Title</h1>

                            <div className="container">
                                <div>
                                <div className="row">
                                    <div className="col s6 offset-s3">
                                        <div className="input-field">
                                            <input required type="text" id="title" onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col s12 center">
                                        <button type="button" onClick={this.nextStage} className="btn-large hoverable deep-purple">Next</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else if(this.state.currentStage === 1) {
                return (
                    <div>
                        <Nav/>
                        <NavLink to='/'>
                            <div className="backButton btn-floating btn-large waves-effect hoverable waves-light deep-purple">
                                { /* eslint-disable-next-line */ }
                                <i className="material-icons">arrow_back</i>
                            </div>
                        </NavLink>
                        <div className="valign-wrapper">
                            <div className="container">
                                <form onSubmit={this.handleSubmit} className="">
                                    <div className="row">
                                        <div className="col s12 center">
                                            <h1 className="createQuizTitle">Questions</h1>
                                        </div>
                                    </div>
                                    <div className="row areaMargin">
                                        <div className="row noBottomMargin">
                                            <div className="col s6 offset-s3">
                                                <Question questions={this.state.questions}/>
                                            </div>
                                        </div>
                                        <div className="row noBottomMargin">
                                            <div className="col s5 offset-s1">
                                                <div className="input-field">
                                                    <label htmlFor="question">Qustion</label>
                                                    <input type="text" id="currentQuestion" onChange={this.handleChange}/>
                                                </div>
                                            </div>
                                            <div className="col s5">
                                                <div className="input-field">
                                                    <label htmlFor="answer">Answer</label>
                                                    <input type="text" id="currentAnswer" onChange={this.handleChange}/>
                                                </div>
                                            </div>
                                            <div className="col s6 offset-s3 center">
                                                <button type="button" onClick={this.addQuestion} className="btn-large btn2 hoverable deep-purple">Add Question</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="input-field center">
                                            <button className="btn-large hoverable deep-purple">Create Quiz</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        authStatus: state.firebase.auth
    }
}
// Dispatch function. 
const mapDispatchToProps = (dispatch) => {
    return {
        createQuiz: (quiz) => dispatch(createQuiz(quiz))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuiz)
