import React from 'react';
import Nav from '../Layout/Nav';
import { NavLink } from 'react-router-dom';

const ResultsPage = ({correctNum, questionsNum}) => {
    return (
        <div>
            <Nav/>
            <NavLink to='/Dashboard'>
                <div className="backButton btn-floating btn-large waves-effect hoverable waves-light deep-purple">
                    { /* eslint-disable-next-line */ }
                    <i className="material-icons">arrow_back</i>
                </div>
            </NavLink>
            <div className="valign-wrapper">
                <div className="container">
                    <div>
                        <div className="row">
                            <div className="col s8 offset-s2">
                            <div className="card bigCard center deep-purple">
                                <div className="card-content card-title">
                                    <span className="card-title">Correct Answers: { correctNum } / { questionsNum }</span>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultsPage;