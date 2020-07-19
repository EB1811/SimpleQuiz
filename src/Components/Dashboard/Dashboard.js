import React, { Component } from 'react';
import QuizList from '../Quiz/QuizList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'

class Dashboard extends Component {
    render(){
        //console.log(this.props);

        const { quizzes } = this.props;

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 ">
                        <QuizList quizzes={quizzes}/>
                    </div>
                </div>
            </div>
        )
    }
}

// Turns redux store into component props.
const mapStateToProps = (state) => {
    console.log(state);
    return {
        quizzes: state.firestore.ordered.quizzes
    }
} 

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'quizzes' }
    ])
)(Dashboard);