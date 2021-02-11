import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Motion variant.
// Parent.
const animateVariants = {
    start: {
        opacity: 0,
    },
    finish: {
        opacity: 1,
        transition: {
            opacity: { duration: 0.5 },
            when: "beforeChildren",
            staggerChildren: 0.3,
        },
    },
    exit: {
        x: -1000,
        opacity: 0,
        transition: {
            type: "spring",
            stiffness: 1000,
            damping: 55,
        },
    },
};
// Children.
const animateVariants2 = {
    start: {
        x: "100vw",
    },
    finish: {
        x: 0,
        transition: {
            type: "spring",
            stiffness: 1000,
            damping: 55,
        },
    },
};
const animateVariants3 = {
    start: {
        x: "100vw",
    },
    finish: {
        x: 0,
        transition: {
            type: "spring",
            stiffness: 1000,
            damping: 55,
        },
    },
};

const Base = () => {
    return (
        <motion.div
            className='core'
            variants={animateVariants}
            initial='start'
            animate='finish'
            exit='exit'
        >
            <h1 className='title'>Simple Quizzes</h1>

            <div className='container valign-wrapper'>
                <div
                    className='row center-align'
                    style={{ marginTop: "150px" }}
                >
                    <motion.div
                        className='col s12 m6'
                        style={{ margin: "10px 0" }}
                        variants={animateVariants2}
                    >
                        <Link
                            to='/Dashboard'
                            className='btn-large hoverable deep-purple'
                        >
                            View Quizzes
                        </Link>
                    </motion.div>
                    <motion.div
                        className='col s12 m6'
                        style={{ margin: "10px 0" }}
                        variants={animateVariants3}
                    >
                        <Link
                            to='/createquiz'
                            className='btn-large hoverable deep-purple'
                        >
                            Create Quiz
                        </Link>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Base;
