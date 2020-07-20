import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';

const Nav = (props) => {
    const { authStatus, profile } = props;
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">Simple Quiz</Link>
                { authStatus.isLoaded && (authStatus.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks />) }
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        authStatus: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Nav);