import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from '../../components/navigation';
import { pushAlert, popAlert } from '../../features/alerts/actions';
import { getIncome } from '../../features/income/actions';
import { getAccount } from '../../features/accounts/actions';
import { getIncomeExpenses } from '../../features/expenses/actions';
import {
  Button,
  Container,
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap';
import Loading from '../../components/Loading';
import ExpensesTable from '../../components/ExpensesTable';

class Income extends Component {
  constructor(props) {
    super(props);

    let accountId = 0;
    let incomeId = 0;

    if (!isNaN(parseInt(this.props.match.params.accountId))) {
      accountId = parseInt(this.props.match.params.accountId)
    }

    if (!isNaN(parseInt(this.props.match.params.incomeId))) {
      incomeId = parseInt(this.props.match.params.incomeId)
    }

    this.state = {
      accountId: accountId,
      incomeId: incomeId
    }
  }

  async componentDidMount() {
    await this.props.getAccount(
      this.state.accountId
    )
    await this.props.getIncome(
      this.state.accountId,
      this.state.incomeId
    )
    await this.props.getIncomeExpenses(
      this.state.accountId,
      this.state.incomeId
    )
    console.log(this.props);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Navigation />
        <Container>
          {this.props.isFetching
            ? <Loading />
            : (
              <div>
                <Breadcrumb>
                  <BreadcrumbItem><a href="/accounts">Accounts</a></BreadcrumbItem>
                  <BreadcrumbItem><a href={`/accounts/${this.props.account.id}`}>{this.props.account.description}</a></BreadcrumbItem>
                  <BreadcrumbItem active>Income</BreadcrumbItem>
                </Breadcrumb>
                <div>
                  <h2 className="plutus-subheader">{this.props.income.description} - Income</h2>
                </div>
                <ExpensesTable
                  expenses={this.props.expenses}
                />
                <a 
                  className="btn btn-success" 
                  href={`/accounts/${this.state.accountId}/income/${this.state.incomeId}/expense/create`}
                >
                  Create Expense
                </a>
              </div>
            )
          }
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  alerts: state.alertsReducer.alerts,
  isFetching: state.accountsReducer.isFetching
    || state.incomeReducer.isFetching
    || state.expensesReducer.isFetching,
  income: state.incomeReducer.income,
  expenses: state.expensesReducer.expenses,
  account: state.accountsReducer.account
});

const mapActionsToProps = {
  getIncome,
  getIncomeExpenses,
  getAccount,
  popAlert,
  pushAlert
}

export default connect(mapStateToProps, mapActionsToProps)(Income);