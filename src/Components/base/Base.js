import React from 'react';
import { Link } from 'react-router-dom';

const Base = () => {
    return (
        <div className="core">
            <h1 className="title">Simple Quizzes</h1>
        
            <div className="container valign-wrapper">
                <div className="row">
                        <div className="col s6">
                            <Link to='/Dashboard' className="btn-large hoverable deep-purple">View Quizzes</Link>
                        </div>
                        <div className="col s6">
                            <Link to='/createquiz' className="btn-large hoverable deep-purple">Create Quiz</Link>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Base;