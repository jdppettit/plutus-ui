import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from '../../components/navigation';
import { getLinkToken } from '../../features/accounts/actions';
import { pushAlert, popAlert } from '../../features/alerts/actions';
import showAlert from '../../util/alerts';
import {
  Button,
  Container,
  Card,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap';
import { PlaidLink } from 'react-plaid-link';
import Loading from '../../components/Loading';

class Default extends Component {
  constructor(props) {
    super(props);

    this.popAlert = this.popAlert.bind(this);
  }

  popAlert() {
    this.props.pushAlert(['success', 'ohboy']);
    showAlert(this.props.alerts);
    this.props.popAlert();
  }

  async componentDidMount() {
    await this.props.getLinkToken();
    console.log(this.props.linkToken);
    showAlert(this.props.alerts);
    this.props.popAlert();
  }

  componentDidUpdate() {
    showAlert(this.props.alerts);
    this.props.popAlert();
  }

  onSuccess(publicToken) {
    console.log("success");
  }

  render() {
    return (
      <div>
        <Navigation />
        <Container>
          {this.props.isFetching
            ? <Loading />
            : (
            <PlaidLink
              token={this.props.linkToken}
              onSuccess={this.onSuccess}
              env="sandbox"
            >
              Connect a bank account
            </PlaidLink>
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
  isFetching: state.accountsReducer.isFetching
});

const mapActionsToProps = {
  getLinkToken,
  popAlert,
  pushAlert
}

export default connect(mapStateToProps, mapActionsToProps)(Default);
