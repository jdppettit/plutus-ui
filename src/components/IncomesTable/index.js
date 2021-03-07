import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table
} from 'reactstrap';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  formatMoney, 
} from '../../util/money';

class IncomesTable extends Component {
  render() {
    let incomes = this.props.incomes || []
    return (
      <Table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Income Day of Week</th>
            <th>Income Day of Month</th>
            <th>Income Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {incomes.map((value, index) => {
          return (
            <tr key={index}>
              <td><a href={`/accounts/${value.account_id}/income/${value.id}`}>{value.description}</a></td>
              <td>{value.day_of_week}</td>
              <td>{value.day_of_month}</td>
              <td>{ formatMoney(value.amount) }</td>
              <td>
                <a href={`/accounts/${value.account_id}/income/${value.id}/delete`}>
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

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(IncomesTable);