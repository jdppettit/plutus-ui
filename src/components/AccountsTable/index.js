import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table
} from 'reactstrap';

class AccountsTable extends Component {
  render() {
    let accounts = this.props.accounts || []
    return (
      <Table>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Account Description</th>
          </tr>
        </thead>
        <tbody>
        {accounts.map((value, index) => {
          return (
            <tr key={index}>
              <td><a href={`/accounts/${value.id}`}>{value.id}</a></td>
              <td>{value.description}</td>
            </tr>
          )
        })}
        </tbody>
      </Table>
    )
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(AccountsTable);