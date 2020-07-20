import React, { Component } from 'react'
import { connect } from 'react-redux';
import { signIn } from '../../Store/Actions/authActions'
import { Redirect } from 'react-router-dom';

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
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <div className="row center">
                        <h5 className="grey-text text-darken-3">Sign In</h5>
                    </div>

                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input required type="email" id="email" onChange={this.handleChange}/>
                    </div>
                    
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input required type="password" id="password" onChange={this.handleChange}/>
                    </div>
                    
                    <div className="input-field center">
                        <button className="btn pink lighten-1">Log In</button>
                        <div className="red-text row">
                            { authError ? <h5>{authError}</h5> : null}
                        </div>
                    </div>
                </form>
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
