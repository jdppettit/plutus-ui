import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table
} from 'reactstrap';
import { formatMoney } from '../../util/money';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactTooltip from 'react-tooltip';

class ExpensesTable extends Component {
  render() {
    let expenses = this.props.expenses || []
    return (
      <Table>
        <ReactTooltip />
        <thead>
          <tr>
            <th>Expense Description</th>
            <th>Expense Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {expenses.map((value, index) => {
          return (
            <tr key={index}>
              <td>
                <a href={`/accounts/${this.props.accountId}/income/${this.props.incomeId}/expense/${value.id}`}>{value.description}</a>
              </td>
              <td>{formatMoney(value.amount)}</td>
              <td>
              <a href={`/accounts/${this.props.account_id}/income/${this.props.income.id}/expense/${value.id}/delete`} data-tip="Delete expense">
                <FontAwesomeIcon icon={faTrashAlt} />
              </a>
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

export default connect(mapStateToProps)(ExpensesTable);