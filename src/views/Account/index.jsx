import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from '../../components/navigation';
import { getAccount } from '../../features/accounts/actions';
//import { getIncome } from '../../features/income/actions';
import { getAccountTransactions } from '../../features/transactions/actions';
import { getAccountIncomes } from '../../features/income/actions';
import { pushAlert, popAlert } from '../../features/alerts/actions';
import {
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import Loading from '../../components/Loading';
import TransactionsTable from '../../components/TransactionsTable';
import IncomesTable from '../../components/IncomesTable';

class Default extends Component {
  constructor(props) {
    super(props);

    let accountId = 0;

    if (!isNaN(parseInt(this.props.match.params.accountId))) {
      accountId = parseInt(this.props.match.params.accountId)
    }

    this.state = {
      accountId: accountId
    }
  }

  async componentDidMount() {
    await this.props.getAccount(this.state.accountId);
    await this.props.getAccountTransactions(this.state.accountId);
    await this.props.getAccountIncomes(this.state.accountId);
    console.log(this.props.incomes);
  }

  render() {
    return (
      <div>
        <Navigation />
        <Container>
          {this.props.isFetching
            ? <Loading />
            : (
              <div>
                <h1>{ this.props.account.description }</h1>
                <TransactionsTable
                  transactions={this.props.transactions}
                />
                <IncomesTable
                  incomes={this.props.incomes}
                />
                <a className="btn btn-success" href={`/accounts/${this.state.accountId}/income/create`}>Create Income</a>
              </div>
            )
          }
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  linkToken: state.accountsReducer.linkToken,
  alerts: state.alertsReducer.alerts,
  isFetching: state.accountsReducer.isFetching 
    || state.incomeReducer.isFetching 
    || state.transactionsReducer.isFetching,
  accounts: state.accountsReducer.accounts,
  account: state.accountsReducer.account,
  transactions: state.transactionsReducer.transactions,
  incomes: state.incomeReducer.incomes,
});

const mapActionsToProps = {
  getAccount,
  getAccountTransactions,
  getAccountIncomes,
  popAlert,
  pushAlert
}

export default connect(mapStateToProps, mapActionsToProps)(Default);