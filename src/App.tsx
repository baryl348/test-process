import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './container/login/login';
import Registration from './container/registration/registration';
import Profile from './container/profile/profile'
import Process from './container/process-container/process';




const App: React.FC = (props) => {

  return <div>
    <Switch>
      <Route exact path="/" render={() => <Redirect to={"/Login"} />} />
      <Route
        path="/Login"
        render={() => <Login />}
      />
      <Route
        path="/Registration"
        render={() => <Registration />}
      />
      <Route
        path="/Profile"
        render={() => <Profile />}
      />
      <Route
        path="/Process"
        render={() => <Process />}
      />
      <Route path='*' render={() => <div>404 not found</div>} />
    </Switch>
  </div>
}



export default App;
