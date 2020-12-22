import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
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

      {/* //TODO сделать компоненты process */}
      <Route
        path="/Process"
        render={() => <Process />}
      />
    </Switch>
  </div>
}



export default App;
