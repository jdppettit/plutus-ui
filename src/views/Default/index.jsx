import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from '../../components/navigation';
import { getLinkToken, createAccount, getAccounts } from '../../features/accounts/actions';
import { pushAlert, popAlert } from '../../features/alerts/actions';
import showAlert from '../../util/alerts';
import { formatAccountDescription } from '../../util/account';
import {
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { PlaidLink } from 'react-plaid-link';
import Loading from '../../components/Loading';
import Modal from 'react-modal';

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
  error: state.checksReducer.error,
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