import React, { Component } from 'react'
import { connect } from 'react-redux';
import { signIn } from '../../Store/Actions/authActions'
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

class SignIn extends Component {

    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state)
    }

    render() {
        const { authError, authStatus } = this.props;

        if(authStatus.isLoaded) {
        // Route guarding
        if(authStatus.uid) return <Redirect to='/' />

        return (
            <div>
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
                                        <label htmlFor="password">Password</label>
                                        <input required type="password" id="password" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col s2 offset-s4">
                                    <button className="btn-large hoverable deep-purple">Log In</button>
                                </div>
                                <div className="col s2">
                                    <NavLink to='/signup' className="btn-large hoverable deep-purple">Sign Up</NavLink>
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
            </div>
        )
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        authError: state.auth.authError,
        authStatus: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
