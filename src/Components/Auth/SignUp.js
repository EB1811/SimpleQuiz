import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../Store/Actions/authActions';
import { NavLink } from 'react-router-dom';
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

class SignUp extends Component {

    state = {
        email: '',
        password: '',
        username: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state)
    }

    render() {
        const { authStatus, authError } = this.props;
        if(authStatus.isLoaded) {
        // Route guarding
        if(authStatus.uid) return <motion.div exit="undefined"> <Redirect to='/' /> </motion.div>

        return (
            <motion.div
                variants={animateVariants} initial="start" animate="finish" exit="exit"
            >
                <NavLink to='/'>
                    <div className="backButton btn-floating btn-large waves-effect hoverable waves-light deep-purple">
                        { /* eslint-disable-next-line */ }
                        <i className="material-icons">arrow_back</i>
                    </div>
                </NavLink>
                <div className="valign-wrapper">
                        <div className="container">
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col s6 offset-s3">
                                        <div className="input-field">
                                            <label htmlFor="email">Email</label>
                                            <input required type="email" id="email" onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="col s6 offset-s3">
                                        <div className="input-field">
                                            <label htmlFor="username">Username</label>
                                            <input required type="text" id="username" onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="col s6 offset-s3">
                                        <div className="input-field">
                                            <label htmlFor="password">Password</label>
                                            <input required type="password" id="password" onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col s2 offset-s4">
                                        <button className="btn-large hoverable deep-purple">Sign Up</button>
                                    </div>
                                    <div className="col s2">
                                        <NavLink to='/login' className="btn-large hoverable deep-purple">Log In</NavLink>
                                    </div>
                                </div>
                                <div className="red-text row">
                                    <div className="col s12 center">
                                        { authError ? <h5>{authError}</h5> : <h5>&nbsp;</h5>}
                                    </div>
                                </div>
                            </form>
                        </div>
                </div>
            </motion.div>
        )
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        authStatus: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)