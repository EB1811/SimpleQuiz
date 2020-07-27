import React from 'react';
import QuizCard from './QuizCard';
import { Link } from 'react-router-dom';

const QuizList = (props) => {
    return (
        <div className="project-list section">
            { props.quizzes && props.quizzes.map(quiz =>{
                return (
                    <Link to={'/quiz/' + quiz.id} key={quiz.id}>
                        <QuizCard anim={props.back} quiz={quiz} key={quiz.id}/>
                    </Link>
                )
            })}
        </div>
    )
}

export default QuizList;