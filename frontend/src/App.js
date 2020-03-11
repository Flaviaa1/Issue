import React from 'react';

import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Issues from './issue/Issues';
import EjemploIssueApi from './issue/EjemploIssueApi'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route path="/issues">
              <EjemploIssueApi/>
            </Route>
            <Redirect path="/" to="/issues" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;