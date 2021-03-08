import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table
} from 'reactstrap';
import { faPencilAlt, faCheck, faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactTooltip from 'react-tooltip';
import { formatDate, capitalize } from '../../util/general';
import { formatMoney } from '../../util/money';
import { updateEventSettled } from '../../features/events/actions';
import { redirectTo } from '../../util/general';

class EventsTable extends Component {
  async setSettled(event, account) {
    await this.props.updateEventSettled(account.id, event.id, true)
    redirectTo(`/accounts/${account.id}?tab=events`)
  }

  async setNotSettled(event, account) {
    await this.props.updateEventSettled(account.id, event.id, false)
    redirectTo(`/accounts/${account.id}?tab=events`)
  }

  renderSettledOption(event, account) {
    if (event && (event.settled === false || event.settled === null)) {
      return (
        <a className="plutus-options-icon" href="#" onClick={() => this.setSettled(event, account)} data-tip="Set settled">
          <FontAwesomeIcon icon={faCheck} />
        </a>
      )
    } else if (event && event.settled === true) {
      return (
        <a className="plutus-options-icon" href="#" onClick={() => this.setNotSettled(event, account)} data-tip="Set not settled">
          <FontAwesomeIcon icon={faBan} />
        </a> 
      )
    } else {
      return;
    }
  }
  render() {
    let events = this.props.events || []
    let account = this.props.account || {} 
    return (
      <div>
        <ReactTooltip />
        <Table striped>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Settled</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {events.map((value, index) => {
            return (
              <tr key={index}>
                <td>{ formatDate(value.anticipated_date) }</td>
                <td>{ capitalize(value.type) }</td>
                <td>{value.description}</td>
                <td>{ formatMoney(value.amount) }</td>
                <td>{value.settled === true ? "True" : "False"}</td>
                <td>
                  <a href="#" onClick={() => this.props.handleEdit(value.id, value.amount)} data-tip="Edit amount">
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </a>
                  { this.renderSettledOption(value, account) }
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
  isFetching: state.accountsReducer.isFetching 
  || state.incomeReducer.isFetching 
  || state.transactionsReducer.isFetching
  || state.eventsReducer.isFetching,
});

const mapActionToProps = {
  updateEventSettled
}

export default connect(mapStateToProps, mapActionToProps)(EventsTable);