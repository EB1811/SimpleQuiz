import React from 'react';

const Question = ({questions}) => {
    return (
        <ul className="collection with-header">
            <li className="collection-header deep-purple"><h5 className="colTitle">Current Questions</h5></li>
            { questions && questions.map(question =>{
                return (
                    <div className="collection-item deep-purple colText" key={question.id}>
                        Question: {question.question} <br/>
                        Answer: {question.answer}
                    </div>
                )
            })}
        </ul>
    )
}

export default Question;