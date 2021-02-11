import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from '../../components/navigation';
import { getAccount } from '../../features/accounts/actions';
//import { getIncome } from '../../features/income/actions';
import { getTransactionsWindow } from '../../features/transactions/actions';
import { getAccountIncomes } from '../../features/income/actions';
import { getEventsWindow } from '../../features/events/actions';
import { pushAlert, popAlert } from '../../features/alerts/actions';
import {
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import Loading from '../../components/Loading';
import TransactionsTable from '../../components/TransactionsTable';
import IncomesTable from '../../components/IncomesTable';
import EventsTable from '../../components/EventsTable';
import moment from 'moment';
import { isObject } from 'reactstrap/lib/utils';

class Default extends Component {
  constructor(props) {
    super(props);

    let accountId = 0;

    if (!isNaN(parseInt(this.props.match.params.accountId))) {
      accountId = parseInt(this.props.match.params.accountId)
    }

    this.incrementDate = this.incrementDate.bind(this);
    this.decrementDate = this.decrementDate.bind(this);

    this.state = {
      accountId: accountId,
      currentMonthWindow: moment().format('MMMM, YYYY')
    }
  }

  async componentDidMount() {
    let startWindow = moment(this.state.currentMonthWindow, 'MMMM, YYYY').clone().startOf('month').format('YYYY-MM-DD');
    let endWindow = moment(this.state.currentMonthWindow, 'MMMM, YYYY').clone().endOf('month').format('YYYY-MM-DD');

    await this.props.getAccount(this.state.accountId);
    await this.props.getTransactionsWindow(this.state.accountId, startWindow, endWindow);
    await this.props.getAccountIncomes(this.state.accountId);
    await this.props.getEventsWindow(this.state.accountId, startWindow, endWindow)
  }

  async incrementDate(e) {
    e.preventDefault();
    let next_date = moment(
      this.state.currentMonthWindow, 'MMMM, YYYY'
    ).add(1, 'month').format('MMMM, YYYY');
    await this.setState({
      currentMonthWindow: next_date
    });

    let startWindow = moment(this.state.currentMonthWindow, 'MMMM, YYYY').clone().startOf('month').format('YYYY-MM-DD');
    let endWindow = moment(this.state.currentMonthWindow, 'MMMM, YYYY').clone().endOf('month').format('YYYY-MM-DD');

    await this.props.getEventsWindow(this.state.accountId, startWindow, endWindow)
    await this.props.getTransactionsWindow(this.state.accountId, startWindow, endWindow);
  }

  async decrementDate(e) {
    e.preventDefault();
    let next_date = moment(
      this.state.currentMonthWindow, 'MMMM, YYYY'
    ).subtract(1, 'month').format('MMMM, YYYY');
    await this.setState({
      currentMonthWindow: next_date
    });

    let startWindow = moment(this.state.currentMonthWindow, 'MMMM, YYYY').clone().startOf('month').format('YYYY-MM-DD');
    let endWindow = moment(this.state.currentMonthWindow, 'MMMM, YYYY').clone().endOf('month').format('YYYY-MM-DD');

    await this.props.getEventsWindow(this.state.accountId, startWindow, endWindow)
    await this.props.getTransactionsWindow(this.state.accountId, startWindow, endWindow);
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
                <Pagination aria-label="Page navigation example">
                  <PaginationItem>
                    <PaginationLink previous onClick={this.decrementDate}/>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink>
                      {this.state.currentMonthWindow}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem >
                    <PaginationLink next onClick={this.incrementDate}/>
                  </PaginationItem>
                </Pagination>
                <EventsTable
                  events={this.props.events}
                />
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
  events: state.eventsReducer.events
});

const mapActionsToProps = {
  getAccount,
  getTransactionsWindow,
  getAccountIncomes,
  getEventsWindow,
  popAlert,
  pushAlert
}

export default connect(mapStateToProps, mapActionsToProps)(Default);