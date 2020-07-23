import React from 'react';
import moment from 'moment';

const QuizCard = ({quiz}) => {
    return (
        <div className="col s12 m4 l3">
            <div className="card deep-purple hoverable project-summary">
                <div className="card-content">
                    <h5 className="quizTitle">{quiz.title}</h5>
                    <p className="infoText grey-text">Posted by {quiz.author}</p>
                    <p className="infoText grey-text">{  moment(quiz.dateCreated.toDate()).calendar() }</p>
                </div>
            </div>
        </div>
    )
}

export default QuizCard;