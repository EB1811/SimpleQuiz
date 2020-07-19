import React from 'react';

const Question = ({questions}) => {
    return (
        <ul className="collection with-header">
            <li className="collection-header"><h6>Current Questions</h6></li>
            { questions && questions.map(question =>{
                return (
                    <div className="collection-item" key={question.id}>
                        Question: {question.question} <br/>
                        Answer: {question.answer}
                    </div>
                )
            })}
        </ul>
    )
}

export default Question;