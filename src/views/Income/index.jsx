import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from '../../components/navigation';
import { pushAlert, popAlert } from '../../features/alerts/actions';
import { getIncome } from '../../features/income/actions';
import { getIncomeExpenses } from '../../features/expenses/actions';
import {
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  Input
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
    return (
      <div>
        <Navigation />
        <Container>
          {this.props.isFetching
            ? <Loading />
            : (
              <div>
                <h1>{this.props.income.description}</h1>
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
});

const mapActionsToProps = {
  getIncome,
  getIncomeExpenses,
  popAlert,
  pushAlert
}

export default connect(mapStateToProps, mapActionsToProps)(Income);