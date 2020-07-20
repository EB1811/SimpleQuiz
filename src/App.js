import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Components imports
import Nav from './Components/Layout/Nav';
import Dashboard from './Components/Dashboard/Dashboard';
import QuizPage from './Components/Quiz/QuizPage';
import SignIn from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';
import CreateQuiz from './Components/Quiz/CreateQuiz';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav/>
        <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route path='/login' component={SignIn}/>
          <Route path='/signUp' component={SignUp}/>
          <Route path='/createquiz' component={CreateQuiz}/>
          <Route path='/quiz/:id' component={QuizPage}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
