import React from 'react';
import { Link } from 'react-router-dom';

const Base = () => {
    return (
            <div className="container valign-wrapper">
                    <div className="row">
                        <div className="col s6">
                            <Link to='/Dashboard' className="btn-large pink lighten-1">View Quizzes</Link>
                        </div>
                        <div className="col s6">
                            <Link to='/createquiz' className="btn-large pink lighten-1">Create Quiz</Link>
                        </div>
                    </div>
            </div>
    )
}

export default Base;