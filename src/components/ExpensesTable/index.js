import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table
} from 'reactstrap';

class ExpensesTable extends Component {
  render() {
    let expenses = this.props.expenses || []
    return (
      <Table>
        <thead>
          <tr>
            <th>Expense ID</th>
            <th>Expense Description</th>
            <th>Expense Amount</th>
          </tr>
        </thead>
        <tbody>
        {expenses.map((value, index) => {
          return (
            <tr key={index}>
              <td>{value.id}</td>
              <td>{value.description}</td>
              <td>{value.amount}</td>
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