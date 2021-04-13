import React, { Suspense, lazy } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

// Framer Motion
import { AnimatePresence } from "framer-motion";

// Components imports
const Dashboard = lazy(() => import("./Components/Dashboard/Dashboard"));
const QuizPage = lazy(() => import("./Components/Quiz/QuizPage"));
const SignIn = lazy(() => import("./Components/Auth/SignIn"));
const SignUp = lazy(() => import("./Components/Auth/SignUp"));
const CreateQuiz = lazy(() => import("./Components/Quiz/CreateQuiz"));
const Base = lazy(() => import("./Components/base/Base"));

function App() {
    // Contains info about route.
    const location = useLocation();

    return (
        <div className='App' style={{ height: "100%" }}>
            <AnimatePresence exitBeforeEnter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch location={location} key={location.pathname}>
                        <Route exact path='/' component={Base} />
                        <Route exact path='/Dashboard' component={Dashboard} />
                        <Route path='/login' component={SignIn} />
                        <Route path='/signUp' component={SignUp} />
                        <Route path='/createquiz' component={CreateQuiz} />
                        <Route path='/quiz/:id' component={QuizPage} />
                    </Switch>
                </Suspense>
            </AnimatePresence>
        </div>
    );
}

export default App;
