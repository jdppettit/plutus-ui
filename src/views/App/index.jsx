import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Default from '../Default/';
import Accounts from '../Accounts/';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/accounts">
          <Accounts />
        </Route>
        <Route path="/">
          <Default />
        </Route>
      </Switch>
    </Router>
  )
}
