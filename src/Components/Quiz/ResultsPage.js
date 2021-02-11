import React from "react";
import Nav from "../Layout/Nav";
import { motion } from "framer-motion";

// Motion variant.
// Parent.
const animateVariants = {
    start: {
        opacity: 0,
        x: 1000,
    },
    finish: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            mass: 0.4,
            stiffness: 1000,
            damping: 100,
            when: "beforeChildren",
        },
    },
};

const ResultsPage = ({ correctNum, questionsNum, back }) => {
    return (
        <div>
            <Nav />
            <button
                onClick={() => back(-1)}
                className='backButton btn-floating btn-large waves-effect hoverable waves-light deep-purple'
            >
                <i className='material-icons'>arrow_back</i>
            </button>
            <motion.div
                className='valign-wrapper'
                variants={animateVariants}
                initial='start'
                animate='finish'
            >
                <div className='container'>
                    <div>
                        <div className='row center-align'>
                            <div className='col s12 m8 offset-m2'>
                                <div
                                    className='card bigCard center deep-purple'
                                    style={{
                                        minWidth: "300px",
                                    }}
                                >
                                    <div className='card-content card-title'>
                                        <span className='card-title'>
                                            Correct Answers: {correctNum} /{" "}
                                            {questionsNum}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ResultsPage;
