import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../Store/Actions/authActions';

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
        if(authStatus.uid) return <Redirect to='/' />

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <div className="row center">
                        <h5 className="grey-text text-darken-3">Sign Up</h5>
                    </div>
                    
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input required type="email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="username">Username</label>
                        <input required type="text" id="username" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input required type="password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field center">
                        <button className="btn pink lighten-1">Sign Up</button>
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