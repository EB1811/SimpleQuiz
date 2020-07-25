import React from 'react';

const Question = (props) => {
    return (
        <ul className="collection with-header">
            { props.questions && props.questions.map(question =>{
                //console.log(question);
                return (
                    <li className="collection-item deep-purple colText" key={question.id}>
                        <div>
                            Question: {question.question} <br/>
                            Answer: {question.answer}
                        </div>
                        <span className="colDel" onClick={() => props.delQuestion(question)}>x</span>
                    </li>
                )
            })}
        </ul>
    )
}

export default Question;