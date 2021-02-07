import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from '../../components/navigation';
import { pushAlert, popAlert } from '../../features/alerts/actions';
import { createExpense } from '../../features/expenses/actions';
import {
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import Loading from '../../components/Loading';

class CreateExpense extends Component {
  constructor(props) {
    super(props);

    let accountId = 0;
    let incomeId = 0;

    if (!isNaN(parseInt(this.props.match.params.accountId))) {
      accountId = parseInt(this.props.match.params.accountId)
    }

    if (!isNaN(parseInt(this.props.match.params.incomeId))) {
      incomeId = parseInt(this.props.match.params.incomeId)
    }

    this.state = {
      accountId: accountId,
      incomeId: incomeId
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(e) {
    e.preventDefault();
    let description = e.target[0].value;
    let amount = e.target[1].value;

    await this.props.createExpense(
      this.state.accountId,
      this.state.incomeId,
      amount,
      description
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
                  <Button className="btn btn-success" type="submit">Add expense</Button>
                </Form>
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
  isFetching: state.accountsReducer.isFetching
    || state.expensesReducer.isFetching,
  accounts: state.accountsReducer.accounts,
});

const mapActionsToProps = {
  popAlert,
  pushAlert,
  createExpense
}

export default connect(mapStateToProps, mapActionsToProps)(CreateExpense);