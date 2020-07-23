import React, { Component } from 'react';
import QuizList from '../Quiz/QuizList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Nav from '../Layout/Nav';
import { NavLink } from 'react-router-dom';

class Dashboard extends Component {
    render(){
        //console.log(this.props);

        const { quizzes } = this.props;

        return (
            <div>
                <Nav/>
                <NavLink to='/'>
                    <div className="backButton">
                        <a class="btn-floating btn-large waves-effect hoverable waves-light deep-purple">
                            <i class="material-icons">arrow_back</i>
                        </a>
                    </div>
                </NavLink>
                <div className="dashboard container">
                    <div className="row">
                        <div className="col s12 ">
                            <QuizList quizzes={quizzes}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// Turns redux store into component props.
const mapStateToProps = (state) => {
    //console.log(state);
    return {
        quizzes: state.firestore.ordered.fireQuizzes
    }
} 

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'quizzes', storeAs: 'fireQuizzes', orderBy: ['dateCreated', 'desc'] }
    ])
)(Dashboard);