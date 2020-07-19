import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createQuiz } from '../../Store/Actions/quizActions'

class CreateQuiz extends Component {

    state = {
        title: '',
        questions: []
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state);
        this.props.createQuiz(this.state)
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Create Quiz</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="questionList">Questions</label>
                    </div>

                    <div className="input-field">
                        <label htmlFor="question">Qustion</label>
                        <input type="text" id="question" onChange={this.handleChange}/>
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
