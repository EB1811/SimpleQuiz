import React from 'react';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';

const Nav = (props) => {
    const { authStatus, profile } = props;
    return (
        <nav className="nav-wrapper">
            <div className="container">
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