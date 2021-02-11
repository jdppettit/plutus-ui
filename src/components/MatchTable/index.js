import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table
} from 'reactstrap';
import { normalize, calculateBalance } from '../../util/models';


class EventsTable extends Component {
  render() {
    let account = this.props.account || {}
    let events = this.props.events || []
    let transactions = this.props.transactions || []
    console.log(moment().format('YYYY-MM-DD'))
    if (account) {
      events = events.concat(transactions);
    }
    events = normalize(events)
    events.sort(function(a, b) {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return c-d;
    });
    return (
      <div>
      <Table>
      <tbody>
          <tr key={account.id}>
            <td>{account.description}</td>
            <td className={account.balance > 0 ? "text-success" : "text-danger"}>
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(calculateBalance(events, account.balance))}
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
              <td>{value.date}</td>
              <td>{value.type}</td>
              <td>{value.description}</td>
              <td className={value.amount > 0 ? "text-success" : "text-danger"}>
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value.amount)}
              </td>
              <td>{value.settled}</td>
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