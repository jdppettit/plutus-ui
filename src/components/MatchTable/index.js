import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Popover,
  PopoverBody,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';
import { normalize } from '../../util/models';
import { capitalize, formatDate} from '../../util/general';
import { 
  formatMoney, 
  getAccountClass, 
  getTransactionClass, 
  determineSettledStyle, 
  determineSettledClass 
} from '../../util/money';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faChartLine, faMoneyBill, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'

class EventsTable extends Component {
  constructor(props) {
    super(props);

    this.togglePopover = this.togglePopover.bind(this);

    this.state = {
      popoverOpen: false
    }
  }

  togglePopover() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  determineIcon(type) {
    let icon;
    switch(type) {
      case "expense":
        icon = <FontAwesomeIcon icon={faHandHoldingUsd} className='fa-2x' data-tip='Expense' />
        break;
      case "transaction": 
        icon = <FontAwesomeIcon icon={faMoneyBill} className='fa-2x' data-tip='Transaction' />
        break;
      case "income": 
        icon = <FontAwesomeIcon icon={faChartLine} className='fa-2x' data-tip='Income' />
        break;
      default:
        icon = ""
        break;
    }
    return icon;
  }

  showBalanceToMaintain(account) {
    if (account.balance_to_maintain && account.balance_to_maintain > 0) {
      return (
        <tr>
          <td></td>
          <td>Less Balance to Maintain</td>
          <td className="text-danger">{ formatMoney(account.balance_to_maintain) }</td>
        </tr>
      )
    }
  }

  sumPendingExpenses(account) {
    let pending = 0.00
    if (account && account.computed_expenses) {
      account.computed_expenses.forEach(exp => {
        pending += exp.amount
      });
    }
    return pending;
  }

  render() {
    let account = this.props.account || {}
    let events = this.props.events || []
    let transactions = this.props.transactions || []
    if (account) {
      events = events.concat(transactions);
    }
    events = normalize(events)
    events.sort(function(a, b) {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return d-c;
    });
    let account_less = this.sumPendingExpenses(account);
    let deducted_expenses = account.computed_expenses || [];
    return (
      <div>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.togglePopover}>
          <PopoverBody>
            <Table borderless>
              <thead>
                <tr>
                  <th>Expense</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {deducted_expenses.map((value, index) => 
                  <tr key={index}>
                    <td>{ value.description }</td>
                    <td>{ formatMoney(value.amount) }</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </PopoverBody>
      </Popover>
      <Card >
        <CardHeader>
          <span>Balance Details</span>
        </CardHeader>
        <CardBody>
        <Table borderless>
          <tbody>
              <tr key={account.id}>
                <td></td>
                <td>Reported Balance</td>
                <td className={getAccountClass(account.balance)}>
                  { formatMoney(account.balance) }
                </td>
              </tr>
              <tr>
                <td></td>
                <td>Less Pending Expenses</td>
                <td className="text-danger">
                  { formatMoney(account_less) }
                  <FontAwesomeIcon id="Popover1" icon={faInfoCircle} color="grey" style={{ "marginLeft": "5px" }}/>
                </td>
              </tr>
              { this.showBalanceToMaintain(this.props.account) }
              <tr>
                <td></td>
                <td>Computed Available Balance</td>
                <td className={getAccountClass(account.computed_balance)}>
                  { formatMoney(account.computed_balance) }
                </td>
              </tr>
          </tbody>
        </Table>
        </CardBody>
      </Card>
      <br/>
      <Table striped>
        <thead>
          <tr>
            <th>Type</th>
            <th>Details</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
        {events.map((value, index) => {
          return (
            <tr key={index} style={ determineSettledStyle(value.settled) } className={determineSettledClass(value.settled)}>
              <td>{ capitalize(value.type) }</td>
              <td>
                <span className="table-description">{ value.description }</span>
                <span className="table-date text-muted">{ formatDate(value.date) }</span>
              </td>
              <td className={getTransactionClass(value.amount, value.type)}>
                { formatMoney(value.amount) }
              </td>
            </tr>
          )
        })}
        </tbody>
      </Table>
      </div>
    )
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(EventsTable);