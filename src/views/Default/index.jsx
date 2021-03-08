import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from '../../components/navigation';
import { getLinkToken, createAccount, getAccounts } from '../../features/accounts/actions';
import { pushAlert, popAlert } from '../../features/alerts/actions';
import {
  Container,
  Card,
  Row,
  Col
} from 'reactstrap';
import Loading from '../../components/Loading';
import { formatMoney } from '../../util/money';
import AccountTypeFunds from '../../components/AccountTypeFunds'

class Default extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalFunds: 0.00,
      computedFunds: 0.00
    }
  }

  async componentDidMount() {
    await this.props.getAccounts()
    this.props.accounts.forEach(account => {
      if (account.include_in_overall) {
        this.setState({
          totalFunds: this.state.totalFunds + account.balance,
          computedFunds: this.state.computedFunds + account.computed_balance
        })
      }
    })
  }

  render() {
    return (
      <div>
        <Navigation />
        <Container>
          {this.props.isFetching
            ? <Loading />
            : (
              <div>
                  <Card>
                    <Row style={{padding: "1em"}}>
                      <Col>
                        <div style={{textAlign: "center", fontWeight: "bold"}}>
                          Total Funds
                        </div>
                      </Col>
                      <Col>
                        {formatMoney(this.state.totalFunds)}
                      </Col>
                    </Row>
                    <Row style={{padding: "1em"}}>
                      <Col>
                        <div style={{textAlign: "center", fontWeight: "bold"}}>
                          Computed Total
                        </div>
                      </Col>
                      <Col>
                        {formatMoney(this.state.computedFunds)}
                      </Col>
                    </Row>
                  </Card>
                  <Row>
                    <Col>
                      <AccountTypeFunds accounts={this.props.accounts} />
                    </Col>
                    <Col>
                      <AccountTypeFunds accounts={this.props.accounts} />
                    </Col>
                  </Row>
              </div>
            )
          }
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  linkToken: state.accountsReducer.linkToken,
  alerts: state.alertsReducer.alerts,
  isFetching: state.accountsReducer.isFetching,
  accounts: state.accountsReducer.accounts,
});

const mapActionsToProps = {
  getAccounts,
  popAlert,
  pushAlert
}

export default connect(mapStateToProps, mapActionsToProps)(Default);