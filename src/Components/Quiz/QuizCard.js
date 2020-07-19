import React from 'react';

const QuizCard = ({quiz}) => {
    return (
        <div className="col s4">
            <div className="card blue-grey darken-3 hoverable project-summary">
                <div className="card-content white-text text-darken-3">
                    <span className="card-title">{quiz.title}</span>
                    <p>Posted by {quiz.author}</p>
                    <p className="grey-text">02/12/12</p>
                </div>
            </div>
        </div>
    )
}

export default QuizCard;