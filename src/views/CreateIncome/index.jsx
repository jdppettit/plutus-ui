import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from '../../components/navigation';
import { pushAlert, popAlert } from '../../features/alerts/actions';
import { getAccount } from '../../features/accounts/actions';
import { createIncome } from '../../features/income/actions';
import {
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody
} from 'reactstrap';
import Loading from '../../components/Loading';
import { redirectTo } from '../../util/general';

class CreateIncome extends Component {
  constructor(props) {
    super(props);

    let accountId = 0;

    if (!isNaN(parseInt(this.props.match.params.accountId))) {
      accountId = parseInt(this.props.match.params.accountId)
    }

    this.state = {
      accountId: accountId
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.getAccount(
      this.state.accountId
    )
  }

  async onSubmit(e) {
    e.preventDefault();
    let description = e.target[0].value;
    let amount = e.target[1].value;
    let recurring = e.target[2].value === "true" ? true : false;
    let dayOfWeek = e.target[3].value ? parseInt(e.target[3].value) : e.target[3].value;
    let dayOfMonth = e.target[4].value ? parseInt(e.target[4].value) : e.target[4].value;
    let month = e.target[5].value ? parseInt(e.target[5].value) : e.target[5].value;

    await this.props.createIncome(
      this.state.accountId,
      recurring,
      dayOfMonth,
      dayOfWeek,
      amount,
      description,
      month
    )
    redirectTo(`/accounts/${this.state.accountId}`);
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
                <Breadcrumb>
                  <BreadcrumbItem><a href="/accounts">Accounts</a></BreadcrumbItem>
                  <BreadcrumbItem><a href={`/accounts/${this.props.account.id}`}>{this.props.account.description}</a></BreadcrumbItem>
                  <BreadcrumbItem active>Create Income</BreadcrumbItem>
                </Breadcrumb>
                <div>
                  <h3 className="plutus-subheader">Create Income</h3>
                </div>
                <Card>
                  <CardBody>
                    <Form onSubmit={this.onSubmit}>
                      <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                          type="text"
                          name="description"
                          id="description"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="amount">Amount</Label>
                        <Input
                          type="number"
                          name="amount"
                          id="amount"
                          step="0.01"
                        />
                      </FormGroup>
                      <FormGroup> 
                        <Label for="recurring">Recurring</Label>
                        <Input 
                          type="select" 
                          name="recurring" 
                          id="recurring"
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="dayOfWeek">Day of week</Label>
                        <Input 
                          type="select" 
                          name="dayOfWeek" 
                          id="dayOfWeek"
                        >
                          <option value="0">Sunday</option>
                          <option value="1">Monday</option>
                          <option value="2">Tuesday</option>
                          <option value="3">Wednesday</option>
                          <option value="4">Thursday</option>
                          <option value="5">Friday</option>
                          <option value="6">Saturday</option>
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="dayOfMonth">Day of month</Label>
                        <Input
                          type="text"
                          name="dayOfMonth"
                          id="dayOfMonth"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="dayOfMonth">Month</Label>
                        <Input
                          type="text"
                          name="month"
                          id="month"
                        />
                      </FormGroup>
                      <Button className="btn btn-success" type="submit">Add income</Button>
                    </Form>
                  </CardBody>
                </Card>
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
  account: state.accountsReducer.account,
});

const mapActionsToProps = {
  popAlert,
  pushAlert,
  createIncome,
  getAccount
}

export default connect(mapStateToProps, mapActionsToProps)(CreateIncome);