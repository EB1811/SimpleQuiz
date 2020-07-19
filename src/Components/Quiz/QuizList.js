import React from 'react';
import QuizCard from './QuizCard';

const QuizList = ({quizzes}) => {
    return (
        <div className="project-list section">
            { quizzes && quizzes.map(quiz =>{
                return (
                    <QuizCard quiz={quiz} key={quiz.id}/>
                )
            })}
        </div>
    )
}

export default QuizList;