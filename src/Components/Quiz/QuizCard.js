import React from 'react';

const QuizCard = ({quiz}) => {
    return (
        <div className="col s4">
            <div className="card blue-grey darken-3 hoverable project-summary">
                <div className="card-content white-text text-darken-3">
                    <span className="card-title">{quiz.Title}</span>
                    <p>Posted by {quiz.Author}</p>
                    <p className="grey-text">date</p>
                </div>
            </div>
        </div>
    )
}

export default QuizCard;