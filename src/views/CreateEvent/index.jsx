import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from '../../components/navigation';
import { getAccount } from '../../features/accounts/actions';
import { createEvent, getEventsWindow } from '../../features/events/actions';
import {
  Container,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Label
} from 'reactstrap';
import Loading from '../../components/Loading';
import { redirectTo } from '../../util/general';
import moment from 'moment';

class CreateEvent extends Component {
  constructor(props) {
    super(props);

    let accountId = 0;

    if (!isNaN(parseInt(this.props.match.params.accountId))) {
      accountId = parseInt(this.props.match.params.accountId)
    }
  
    this.state = {
      accountId: accountId,
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    let currentDate = moment().format('MMM, YYYY')
    let endDate = moment().add(3, 'month').format('MMMM, YYYY')
    let startWindow = moment(currentDate, 'MMMM, YYYY').clone().startOf('month').format('YYYY-MM-DD');
    let endWindow = moment(endDate, 'MMMM, YYYY').clone().endOf('month').format('YYYY-MM-DD');

    await this.props.getAccount(this.state.accountId);
    await this.props.getEventsWindow(
      this.state.accountId,
      startWindow,
      endWindow
    )
  }

  async onSubmit(e) {
    e.preventDefault();

    let description = e.target[0].value;
    let amount = e.target[1].value;
    let anticipatedDate = e.target[2].value;
    let parentId = e.target[3].value;

    await this.props.createEvent(
      this.props.account.id,
      parentId,
      description,
      amount,
      "expense",
      false,
      anticipatedDate,
    )
    redirectTo(`/accounts/${this.state.accountId}?tab=events`)
  }

  generateParentOptions() {
    let events = this.props.events || [];
    return (
      events.map((value, index) => {
        return (
          <option value={value.id}>{value.description} [{value.anticipated_date}]</option>
        )
      })
    )
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
                  <BreadcrumbItem active>Create Event</BreadcrumbItem>
                </Breadcrumb>
                <div>
                  <h2 className="plutus-subheader">Create Event</h2>
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
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="amount">Amount</Label>
                        <Input
                          type="number"
                          step="0.01"
                          name="amount"
                          id="amount"
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="anticipatedDate">Anticipated Date</Label>
                        <Input
                          type="text"
                          name="anticipatedDate"
                          id="anticipatedDate"
                          required
                        />
                      </FormGroup>
                      <FormGroup> 
                        <Label for="parentId">Associated Income</Label>
                        <Input 
                          type="select" 
                          name="parentId" 
                          id="parentId"
                        >
                          { this.generateParentOptions() }
                        </Input>
                      </FormGroup>
                      <Button className="btn btn-success" type="submit">Add event</Button>
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
  isFetching: state.accountsReducer.isFetching ||
    state.eventsReducer.isFetching,
  account: state.accountsReducer.account,
  events: state.eventsReducer.events
});

const mapActionsToProps = {
  getAccount,
  createEvent,
  getEventsWindow
}

export default connect(mapStateToProps, mapActionsToProps)(CreateEvent);