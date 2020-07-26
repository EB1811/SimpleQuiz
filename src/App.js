import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

// Framer Motion
import { AnimatePresence } from 'framer-motion';

// Components imports
import Dashboard from './Components/Dashboard/Dashboard';
import QuizPage from './Components/Quiz/QuizPage';
import SignIn from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';
import CreateQuiz from './Components/Quiz/CreateQuiz';
import Base from './Components/base/Base';

function App() {
  // Contains info about route.
  const location = useLocation();

  return (
    <div className="App" style={{height:"100%"}}>
      <AnimatePresence>
        <Switch location={location} key={location.key}>
          <Route exact path='/' component={Base}/>
          <Route exact path='/Dashboard' component={Dashboard}/>
          <Route path='/login' component={SignIn}/>
          <Route path='/signUp' component={SignUp}/>
          <Route path='/createquiz' component={CreateQuiz}/>
          <Route path='/quiz/:id' component={QuizPage}/>
        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;
