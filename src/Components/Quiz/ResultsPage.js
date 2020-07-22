import React from 'react';

const ResultsPage = ({correctNum, questionsNum}) => {
    return (
        <div className="container">
            <div className="card center blue-grey darken-3">
                <div className="card-content white-text text-darken-3">
                    <span className="card-title">Correct Answers: { correctNum } / { questionsNum }</span>
                </div>
                
            </div>
        </div>
    )
}

export default ResultsPage;