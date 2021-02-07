import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table
} from 'reactstrap';

class IncomesTable extends Component {
  render() {
    let incomes = this.props.incomes || []
    return (
      <Table>
        <thead>
          <tr>
            <th>Income ID</th>
            <th>Income Day of Week</th>
            <th>Income Day of Month</th>
            <th>Income Description</th>
            <th>Income Amount</th>
          </tr>
        </thead>
        <tbody>
        {incomes.map((value, index) => {
          return (
            <tr key={index}>
              <td><a href={`/accounts/${value.account_id}/income/${value.id}`}>{value.id}</a></td>
              <td>{value.day_of_week}</td>
              <td>{value.day_of_month}</td>
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

export default connect(mapStateToProps)(IncomesTable);