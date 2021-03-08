import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card
} from 'reactstrap';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';

class AccountTypeFunds extends Component {
  generateData(accounts) {
    let data = [];
    if (accounts && accounts.length > 0) {
      accounts.forEach(account => {
        data.push({
          name: account.description,
          value: account.computed_balance
        })
      })
    }
    return data;
  }
  render() {
    let accounts = this.props.accounts || []
    let data = this.generateData(accounts)
    return (
      <Card style={{ alignItems: "center" }}>
            <PieChart width={400} height={400}>
              <Pie data={data} dataKey="value" label/>
              <Tooltip />
            </PieChart>
      </Card>
    )
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(AccountTypeFunds);