import React, { Component } from 'react'

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
        console.log(this.state);
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
                        <button className="btn pink lighten-1">Add Question</button>
                    </div>

                    <div className="input-field">
                        <button className="btn pink lighten-1">Create Quiz</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateQuiz
