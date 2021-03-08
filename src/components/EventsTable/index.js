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

class EventsTable extends Component {
  setSettled(eventId) {

  }

  setNotSettled(eventId) {

  }

  renderSettledOption(event) {
    if (event && (event.settled === false || event.settled === null)) {
      return (
        <a className="plutus-options-icon" href="#" onClick={() => this.setSettled(event.id)} data-tip="Set settled">
          <FontAwesomeIcon icon={faCheck} />
        </a>
      )
    } else if (event && event.settled === true) {
      return (
        <a className="plutus-options-icon" href="#" onClick={() => this.setNotSettled(event.id)} data-tip="Set not settled">
          <FontAwesomeIcon icon={faBan} />
        </a> 
      )
    } else {
      return;
    }
  }
  render() {
    let events = this.props.events || []
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
                  { this.renderSettledOption(value) }
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