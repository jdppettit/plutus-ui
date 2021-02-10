import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table
} from 'reactstrap';

class EventsTable extends Component {
  render() {
    let events = this.props.events || []
    return (
      <Table>
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Event Date</th>
            <th>Event Type</th>
            <th>Event Description</th>
            <th>Event Amount</th>
            <th>Event Settled</th>
          </tr>
        </thead>
        <tbody>
        {events.map((value, index) => {
          return (
            <tr key={index}>
              <td>{value.id}</td>
              <td>{value.anticipated_date}</td>
              <td>{value.type}</td>
              <td>{value.description}</td>
              <td>{value.amount}</td>
              <td>{value.settled}</td>
            </tr>
          )
        })}
        </tbody>
      </Table>
    )
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(EventsTable);