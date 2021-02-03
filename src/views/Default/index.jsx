import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from '../../components/navigation';
import { getLinkToken, setPublicToken } from '../../features/accounts/actions';
import { pushAlert, popAlert } from '../../features/alerts/actions';
import showAlert from '../../util/alerts';
import {
  Button,
  Container,
  Card,
  CardBody,
  CardTitle,
  CardText,
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

    this.modalOpen = this.modalOpen.bind(this);
    this.isModalOpen = this.isModalOpen.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.popAlert = this.popAlert.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

    this.state = {
      modalIsOpen: false,
      publicToken: "",
      description: ""
    }

    console.log(this.state);
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

  async onSuccess(publicToken) {
    console.log("success");
    await this.setState({
      modalIsOpen: true,
      publicToken
    });
  }

  async modalOpen() {
    await this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  isModalOpen() {
    console.log(this.state.modalIsOpen);
    return this.state.modalIsOpen;
  }

  handleDescriptionChange(e) {
    if(e.target && e.target.value) {
      this.setState({description: e.target.value})
    }
  }

  async onSubmit(e) {
    e.preventDefault();
    await this.setState({
      modalIsOpen: false
    });
    await this.props.setPublicToken(
      this.state.publicToken,
      this.state.description
    )
    await this.setState({
      publicToken: "",
      description: ""
    });
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
          <Modal
            isOpen={this.state.modalIsOpen}
          >
            <div>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    type="text"
                    name="description"
                    id="description"
                    value={this.state.description}
                    onChange={this.handleDescriptionChange}
                  />
                  <Button className="btn btn-success" type="submit">Add Account</Button>
                </FormGroup>
              </Form>
            </div>
          </Modal>
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
  setPublicToken,
  popAlert,
  pushAlert
}

export default connect(mapStateToProps, mapActionsToProps)(Default);
