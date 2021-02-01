import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from '../../components/navigation';
import { getAllChecks } from '../../features/checks/actions';
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
    showAlert(this.props.alerts);
    this.props.popAlert();
  }

  componentDidUpdate() {
    showAlert(this.props.alerts);
    this.props.popAlert();
  }

  render() {
    return (
      <div>
        <Navigation />
        <Container>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  checks: state.checksReducer.checks,
  error: state.checksReducer.error,
  alerts: state.alertsReducer.alerts,
});

const mapActionsToProps = {
  getAllChecks,
  popAlert,
  pushAlert
}

export default connect(mapStateToProps, mapActionsToProps)(Default);
