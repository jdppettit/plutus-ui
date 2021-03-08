import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table
} from 'reactstrap';
import { 
  formatMoney, 
  getTransactionClass,
  determineSettledStyle, 
  determineSettledClass 
} from '../../util/money';
import { formatDate } from '../../util/general';

class TransactionsTable extends Component {
  render() {
    let transactions = this.props.transactions || []
    return (
      <Table striped>
        <thead>
          <tr>
            <th>Details</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
        {transactions.map((value, index) => {
          return (
            <tr key={index} style={determineSettledStyle(!value.pending)} className={determineSettledClass(!value.pending)}>
              <td>
                <span className="table-description">{ value.description }</span>
                <span className="table-date text-muted">{ formatDate(value.date) }</span>
              </td>
              <td className={ getTransactionClass(value.amount, 'transaction') }>
                { formatMoney(value.amount) }
              </td>
            </tr>
          )
        })}
        </tbody>
      </Table>
    )
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(TransactionsTable);