import React from 'react';
import QuizCard from './QuizCard';
import { Link } from 'react-router-dom';

const QuizList = ({quizzes}) => {
    return (
        <div className="project-list section">
            { quizzes && quizzes.map(quiz =>{
                return (
                    <Link to={'/quiz/' + quiz.id} key={quiz.id}>
                        <QuizCard quiz={quiz} key={quiz.id}/>
                    </Link>
                )
            })}
        </div>
    )
}

export default QuizList;