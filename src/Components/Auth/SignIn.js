import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../Store/Actions/authActions";
import { Redirect } from "react-router-dom";
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

class SignIn extends Component {
    state = {
        email: "",
        password: "",
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    };

    render() {
        const { authError, authStatus } = this.props;

        if (authStatus.isLoaded) {
            // Route guarding
            if (authStatus.uid)
                return (
                    <motion.div exit='undefined'>
                        {" "}
                        <Redirect to='/' />{" "}
                    </motion.div>
                );

            return (
                <motion.div
                    variants={animateVariants}
                    initial='start'
                    animate='finish'
                    exit='exit'
                >
                    <NavLink to='/'>
                        <div className='backButton btn-floating btn-large waves-effect hoverable waves-light deep-purple'>
                            {/* eslint-disable-next-line */}
                            <i className='material-icons'>arrow_back</i>
                        </div>
                    </NavLink>
                    <div className='valign-wrapper'>
                        <div className='container'>
                            <form onSubmit={this.handleSubmit}>
                                <div className='row'>
                                    <div className='col s12 m10 offset-m1 l8 offset-l2'>
                                        <div className='input-field'>
                                            <label htmlFor='email'>Email</label>
                                            <input
                                                required
                                                type='email'
                                                id='email'
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className='input-field'>
                                            <label htmlFor='password'>
                                                Password
                                            </label>
                                            <input
                                                required
                                                type='password'
                                                id='password'
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='row center-align'>
                                    <button
                                        className='btn-large hoverable deep-purple'
                                        style={{ margin: "10px 20px" }}
                                    >
                                        Log In
                                    </button>
                                    <button
                                        className='btn-large hoverable deep-purple'
                                        style={{ margin: "10px 20px" }}
                                        type='button'
                                    >
                                        <NavLink
                                            to='/signup'
                                            className='deep-purple'
                                            style={{
                                                textDecoration: "none",
                                                color: "#1e2425",
                                            }}
                                        >
                                            Sign Up
                                        </NavLink>
                                    </button>
                                </div>
                                <div className='red-text row'>
                                    <div className='col s12 center'>
                                        {authError ? (
                                            <h5>{authError}</h5>
                                        ) : (
                                            <h5>&nbsp;</h5>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        authError: state.auth.authError,
        authStatus: state.firebase.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
