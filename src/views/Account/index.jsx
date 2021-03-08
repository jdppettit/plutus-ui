import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from '../../components/navigation';
import { getAccount, refreshData } from '../../features/accounts/actions';
import { getTransactionsWindow } from '../../features/transactions/actions';
import { getAccountIncomes } from '../../features/income/actions';
import { getEventsWindow, updateEventAmount } from '../../features/events/actions';
import { pushAlert, popAlert } from '../../features/alerts/actions';
import {
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import Loading from '../../components/Loading';
import TransactionsTable from '../../components/TransactionsTable';
import IncomesTable from '../../components/IncomesTable';
import EventsTable from '../../components/EventsTable';
import MatchTable from '../../components/MatchTable'
import AccountSettings from '../../components/AccountSettings';
import moment from 'moment';
import { redirectTo, accountTabSettings } from '../../util/general';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSync } from '@fortawesome/free-solid-svg-icons'
import qs from 'qs';

class Default extends Component {
  constructor(props) {
    super(props);

    let accountId = 0;

    if (!isNaN(parseInt(this.props.match.params.accountId))) {
      accountId = parseInt(this.props.match.params.accountId)
    }

    this.incrementDate = this.incrementDate.bind(this);
    this.decrementDate = this.decrementDate.bind(this);
    this.tabToggle = this.tabToggle.bind(this);
    this.handleEventEdit = this.handleEventEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.modalDismiss = this.modalDismiss.bind(this);
    this.refreshData = this.refreshData.bind(this);

    this.state = {
      accountId: accountId,
      currentMonthWindow: moment().format('MMMM, YYYY'),
      tabActive: "1",
      modalIsOpen: false,
      amount: 0.00,
      modalEventId: 0,
    }
  }

  async tabToggle(tab) {
    await this.setState({
      tabActive: tab 
    })
  }

  async componentDidMount() {
    let startWindow = moment(this.state.currentMonthWindow, 'MMMM, YYYY').clone().startOf('month').format('YYYY-MM-DD');
    let endWindow = moment(this.state.currentMonthWindow, 'MMMM, YYYY').clone().endOf('month').format('YYYY-MM-DD');

    await this.props.getAccount(this.state.accountId);
    await this.props.getTransactionsWindow(this.state.accountId, startWindow, endWindow);
    await this.props.getAccountIncomes(this.state.accountId);
    await this.props.getEventsWindow(this.state.accountId, startWindow, endWindow)

    let tab = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
    
    if (tab && tab.tab && accountTabSettings[tab.tab].tab_number) {
      this.tabToggle(accountTabSettings[tab.tab].tab_number);
    }
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

  async handleEventEdit(eventId, amount) {
    this.setState({
      modalIsOpen: true,
      amount: amount,
      modalEventId: eventId
    });
  }

  async modalDismiss() {
    await this.setState({
      modalIsOpen: false,
      amount: 0.00,
      modalEventId: 0
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    await this.props.updateEventAmount(
      this.state.accountId,
      this.state.modalEventId,
      this.state.amount
    )
    redirectTo(`/accounts/${this.state.accountId}`)
  }

  handleAmountChange(e) {
    if(e.target && e.target.value) {
      this.setState({amount: e.target.value})
    }
  }

  async refreshData() {
    await this.props.refreshData()
  }

  showDatePicker() {
    if (accountTabSettings[this.state.tabActive].show_date_picker === true) {
      return (
        <Pagination>
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
      )
    }
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
                <Breadcrumb>
                  <BreadcrumbItem><a href="/accounts">Accounts</a></BreadcrumbItem>
                  <BreadcrumbItem active>{this.props.account.description}</BreadcrumbItem>
                </Breadcrumb>
                <div>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={this.state.tabActive === "1" ? "active" : ""}
                        onClick={() => {this.tabToggle("1") }}
                        href="#"
                      >
                        Cash Analysis
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={this.state.tabActive === "2" ? "active" : ""}
                        onClick={() => {this.tabToggle("2") }}
                        href="#"
                      >
                        Transactions
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={this.state.tabActive === "3" ? "active" : ""}
                        onClick={() => {this.tabToggle("3") }}
                        href="#"
                      >
                        Income
                      </NavLink>
                     </NavItem>
                     <NavItem>
                      <NavLink
                        className={this.state.tabActive === "4" ? "active" : ""}
                        onClick={() => {this.tabToggle("4") }}
                        href="#"
                      >
                        Events
                      </NavLink>
                     </NavItem>
                     <NavItem>
                      <NavLink
                        className={this.state.tabActive === "5" ? "active" : ""}
                        onClick={() => {this.tabToggle("5") }}
                        href="#"
                      >
                        Settings
                      </NavLink>
                     </NavItem>
                  </Nav>
                </div>

                <div className="clearfix">
                  <div style={{ float: "left"}}>
                    <h3 className="plutus-subheader">{ this.props.account.description }</h3>
                  </div>
                  <div style={{ float: "right" }}>
                    <FontAwesomeIcon style={{ cursor: "pointer" }} className={"fa-2x"} icon={faSync} color="grey" onClick={this.refreshData} border/>
                  </div>
                </div>

                { this.showDatePicker() }

                <TabContent activeTab={this.state.tabActive}>
                  <TabPane tabId="1">
                    <MatchTable
                      account={this.props.account}
                      events={this.props.events}
                      transactions={this.props.transactions}
                    />
                  </TabPane>
                  <TabPane tabId="2">
                    <TransactionsTable
                      transactions={this.props.transactions}
                    />
                  </TabPane>
                  <TabPane tabId="3">
                    <IncomesTable
                      incomes={this.props.incomes}
                    />
                    <a className="btn btn-success" href={`/accounts/${this.state.accountId}/income/create`}>Create Income</a>
                  </TabPane>
                  <TabPane tabId="4">
                    <EventsTable
                      events={this.props.events}
                      handleEdit={this.handleEventEdit}
                    />
                  </TabPane>
                  <TabPane tabId="5">
                    <AccountSettings
                      account={this.props.account}
                    />
                  </TabPane>
                </TabContent>
                <Modal
                  isOpen={this.state.modalIsOpen}
                >
                  <div style={{ padding: "1em" }}>
                    <div>
                    <div style={{ textAlign: "right"}}>
                        <FontAwesomeIcon icon={faTimes} color="grey" onClick={this.modalDismiss}/>
                      </div>
                        <h2>Update Event</h2>
                    </div>
                    <Form onSubmit={this.onSubmit}>
                      <FormGroup>
                        <Label for="description">Amount</Label>
                        <Input
                          type="text"
                          name="amount"
                          id="amount"
                          value={this.state.amount}
                          onChange={this.handleAmountChange}
                        />
                        <Button className="btn btn-success" type="submit">Save</Button>
                      </FormGroup>
                    </Form>
                  </div>
                </Modal>
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
    || state.transactionsReducer.isFetching
    || state.eventsReducer.isFetching,
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
  updateEventAmount,
  refreshData,
  popAlert,
  pushAlert
}

export default connect(mapStateToProps, mapActionsToProps)(Default);