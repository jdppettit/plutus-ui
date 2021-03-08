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
import ReactTooltip from 'react-tooltip';

class IncomesTable extends Component {
  render() {
    let incomes = this.props.incomes || []
    return (
      <div>
        <ReactTooltip />
        <Table striped>
          <thead>
            <tr>
              <th>Description</th>
              <th>Day of Week</th>
              <th>Day of Month</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {incomes.map((value, index) => {
            return (
              <tr key={index}>
                <td>
                  <a href={`/accounts/${value.account_id}/income/${value.id}`}>
                    {value.description}
                  </a>
                </td>
                <td>{value.day_of_week}</td>
                <td>{value.day_of_month}</td>
                <td>{ formatMoney(value.amount) }</td>
                <td>
                  <a href={`/accounts/${value.account_id}/income/${value.id}/delete`} data-tip="Delete income">
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </a>
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

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(IncomesTable);