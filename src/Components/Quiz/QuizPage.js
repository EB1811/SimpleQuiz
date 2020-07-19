import React from 'react'

const QuizPage = (props) => {

    const id = props.match.params.id;

    return (
        // Have to create quiz page yourself l0l
        <div>
            Quiz Goes Here ID=  
            {id}
        </div>

    )
}

export default QuizPage
