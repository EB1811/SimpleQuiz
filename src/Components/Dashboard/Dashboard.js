import React, { Component } from 'react';
import QuizList from '../Quiz/QuizList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Nav from '../Layout/Nav';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// Motion variant.
const animateVariants = {
    start: { 
        x: '100vw' 
    },
    finish: {
        x: 0
    }
}

class Dashboard extends Component {
    render(){
        //console.log(this.props);

        const { quizzes } = this.props;

        return (
            <motion.div
                variants={animateVariants} initial="start" animate="finish">
                <Nav/>
                <NavLink to='/' className="backButton btn-floating btn-large waves-effect hoverable waves-light deep-purple">
                    { /* eslint-disable-next-line */ }
                    <i className="material-icons">arrow_back</i>
                </NavLink>
                <div className="dashboard container">
                    <div className="row">
                        <div className="col s12 ">
                            <QuizList quizzes={quizzes}/>
                        </div>
                    </div>
                </div>
            </motion.div>
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