import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Default from '../Default';
import Accounts from '../Accounts';
import Account from '../Account';
import CreateIncome from '../CreateIncome';
import Income from '../Income';
import CreateExpense from '../CreateExpense';
import DeleteIncome from '../DeleteIncome';
import CreateEvent from '../CreateEvent';
import EditExpense from '../EditExpense';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/accounts/:accountId/income/:incomeId/expense/:expenseId" component={EditExpense} />
        <Route exact path="/accounts/:accountId/income/:incomeId/expense/create" component={CreateExpense} />
        <Route exact path="/accounts/:accountId/events/create" component={CreateEvent} />
        <Route exact path="/accounts/:accountId/income/create" component={CreateIncome} />
        <Route exact path="/accounts/:accountId/income/:incomeId/delete" component={DeleteIncome} />
        <Route exact path="/accounts/:accountId/income/:incomeId" component={Income} />
        <Route exact path="/accounts/:accountId" component={Account} />
        <Route exact path="/accounts" component={Accounts} />
        <Route exact path="/" component={Default} />
      </Switch>
    </Router>
  )
}
