import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Popover,
  PopoverHeader,
  PopoverBody
} from 'reactstrap';
import { normalize } from '../../util/models';
import { formatMoney, getAccountClass, getTransactionClass } from '../../util/money';
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
        icon = <FontAwesomeIcon icon={faHandHoldingUsd} />
        break;
      case "transaction": 
        icon = <FontAwesomeIcon icon={faMoneyBill} />
        break;
      case "income": 
        icon = <FontAwesomeIcon icon={faChartLine} />
        break;
      default:
        icon = ""
        break;
    }
    return icon;
  }

  render() {
    let account = this.props.account || {}
    let events = this.props.events || []
    let transactions = this.props.transactions || []
    console.log(transactions);
    if (account) {
      events = events.concat(transactions);
    }
    events = normalize(events)
    events.sort(function(a, b) {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return c-d;
    });
    let account_less = account.balance - account.computed_balance;
    let deducted_expenses = account.computed_expenses || [];
    return (
      <div>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.togglePopover}>
          <PopoverBody>
            <Table>
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
      <Table>
      <tbody>
          <tr key={account.id}>
            <td>{account.description}</td>
            <td>Current Account Balance</td>
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
          <tr>
            <td></td>
            <td>Computed Available Balance</td>
            <td className={getAccountClass(account.computed_balance)}>
              { formatMoney(account.computed_balance) }
            </td>
          </tr>

      </tbody>
    </Table>
    <br/>
      <Table>
        <tbody>
        {events.map((value, index) => {
          return (
            <tr key={index}>
              <td>{value.id}</td>
              <td>{moment(value.date).format('ll')}</td>
              <td>{this.determineIcon(value.type)} {value.type}</td>
              <td>{value.description}</td>
              <td className={getTransactionClass(value.amount)}>
                { formatMoney(value.amount) }
              </td>
              <td>{value.settled === false ? "Settled" : "Pending"}</td>
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