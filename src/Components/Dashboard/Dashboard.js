import React, { Component } from 'react';
import QuizList from '../Quiz/QuizList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Nav from '../Layout/Nav';
import { motion } from 'framer-motion';

// Motion variant.
const animateVariants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        mass: 0.4,
        stiffness: 1000, 
        damping: 100,
        when: "beforeChildren",
        }
    },
    exit: (direction) => {
      return {
        x: direction < 0 ? '100vw' : '-100vw',
        opacity: 0
      };
    }
};
const animateVariants2 = {
    enter: {
        opacity: 0,
    },
    center: {
      opacity: 1,
      transition: {
          opacity: { duration: 0.25 }
    }
    },
};

class Dashboard extends Component {
    // 1 = right to left.
    state = {
        direction: this.props.location.state ? this.props.location.state : 1
    }    

    back = (value) => {
        this.setState({ 
            direction: value
        });
    
        this.props.history.push('/');
    }

    render(){
        //console.log(this.props);

        const { quizzes } = this.props;

        return (
            <motion.div
                variants={animateVariants} custom={this.state.direction} initial="enter" animate="center" exit="exit"
            >
                <Nav/>
                { /* eslint-disable-next-line */ }
                <button onClick={() => this.back(-1)} className="backButton btn-floating btn-large waves-effect hoverable waves-light deep-purple">
                    <i className="material-icons">arrow_back</i>
                </button>
                <motion.div className="dashboard container"
                    variants={animateVariants2}
                >
                    <div className="row">
                        <div className="col s12 ">
                            <QuizList anim={this.back} quizzes={quizzes}/>
                        </div>
                    </div>
                </motion.div>
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