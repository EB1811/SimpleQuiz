import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createQuiz } from '../../Store/Actions/quizActions';
import Question from './Question';

class CreateQuiz extends Component {

    state = {
        title: '',
        questions: [],
        currentQuestion: '',
        currentAnswer: ''
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
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Create Quiz</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input required type="text" id="title" onChange={this.handleChange}/>
                    </div>

                    <div className="row of">
                        <div className="col s6 offset-s2">
                            <Question questions={this.state.questions}/>
                            <div className="input-field">
                                <label htmlFor="question">Qustion</label>
                                <input type="text" id="currentQuestion" onChange={this.handleChange}/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="answer">Answer</label>
                                <input type="text" id="currentAnswer" onChange={this.handleChange}/>
                            </div>
                            <button type="button" onClick={this.addQuestion} className="btn pink lighten-1">Add Question</button>
                        </div>
                    </div>

                    <div className="input-field">
                        <button className="btn pink lighten-1">Create Quiz</button>
                    </div>
                </form>
            </div>
        )
    }
}

// Dispatch function. 
const mapDispatchToProps = (dispatch) => {
    return {
        createQuiz: (quiz) => dispatch(createQuiz(quiz))
    }
}

export default connect(null, mapDispatchToProps)(CreateQuiz)
