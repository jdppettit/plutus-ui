import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from '../../components/navigation';
import { getLinkToken, createAccount, getAccounts } from '../../features/accounts/actions';
import { pushAlert, popAlert } from '../../features/alerts/actions';
import {
  Container,
} from 'reactstrap';
import Loading from '../../components/Loading';

class Default extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navigation />
        <Container>
          {this.props.isFetching
            ? <Loading />
            : (
              <div></div>
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
  getLinkToken,
  createAccount,
  getAccounts,
  popAlert,
  pushAlert
}

export default connect(mapStateToProps, mapActionsToProps)(Default);