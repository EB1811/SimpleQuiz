import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut} from '../../Store/Actions/authActions';

const SignedInLinks = (props) => {

    const userLetter = props.profile.username ? props.profile.username.charAt(0) : ''
    return (
        <ul className="right">
            <li><NavLink to='/createQuiz'>Create Quiz</NavLink></li>
            <li><a href='/' onClick={props.signOut}>Log Out</a></li>
            <li>
                <NavLink to='/' className='btn btn-floating pink lighten-1'>
                    { userLetter }
                </NavLink>
            </li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);