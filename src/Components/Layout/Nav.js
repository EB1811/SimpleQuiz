import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';

const Nav = (props) => {
    const { authStatus } = props;
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">Simple Quiz</Link>
                { authStatus.isLoaded && (authStatus.uid ? <SignedInLinks /> : <SignedOutLinks />) }
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        authStatus: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Nav);