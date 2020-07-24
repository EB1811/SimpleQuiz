import React from 'react';

const Question = ({questions}) => {
    return (
        <ul className="collection with-header">
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