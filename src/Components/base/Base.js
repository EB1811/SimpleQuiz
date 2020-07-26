import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Motion variant.
const animateVariants = {
    start: { 
        opacity: 0,
    },
    finish: {
        opacity: 1,
    },
    exit: {
        x: '-200vh'
    }
}

const animateVariants2 = {
    start: { 
        x: '100vw',
    },
    finish: {
        x: 0,
        transition: {
            delay: 0.5
        }
    },
}

const animateVariants3 = {
    start: { 
        x: '100vw',
    },
    finish: {
        x: 0,
        transition: {
            delay: 1
        }
    },
}

const Base = () => {
    return (
        <motion.div className="core"
            variants={animateVariants} initial="" animate="" exit="exit">
            <motion.h1 className="title"
            variants={animateVariants} initial="start" animate="finish">
                Simple Quizzes
            </motion.h1>
        
            <div className="container valign-wrapper">
                <div className="row">
                        <motion.div className="col s6"
                            variants={animateVariants2} initial="start" animate="finish"
                        >
                            <Link to='/Dashboard' className="btn-large hoverable deep-purple">View Quizzes</Link>
                        </motion.div>
                        <motion.div className="col s6"
                            variants={animateVariants3} initial="start" animate="finish"
                        >
                            <Link to='/createquiz' className="btn-large hoverable deep-purple">Create Quiz</Link>
                        </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

export default Base;