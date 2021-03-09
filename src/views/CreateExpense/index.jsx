import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from '../../components/navigation';
import { pushAlert, popAlert } from '../../features/alerts/actions';
import { getAccount } from '../../features/accounts/actions';
import { getIncome } from '../../features/income/actions';
import { createExpense } from '../../features/expenses/actions';
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
  CardBody,
  InputGroup
} from 'reactstrap';
import Loading from '../../components/Loading';
import { redirectTo } from '../../util/general';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip';

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
      incomeId: incomeId,
      transactionDescription: "",
      transactionSearchModalOpen: false
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.transactionSearch = this.transactionSearch.bind(this);
    this.closeTransactionSearchModal = this.closeTransactionSearchModal.bind(this);
  }

  async componentDidMount() {
    await this.props.getAccount(
      this.state.accountId
    )
    await this.props.getIncome(
      this.state.accountId,
      this.state.incomeId
    )
  }

  async onSubmit(e) {
    e.preventDefault();
    let description = e.target[0].value;
    let transactionDescription = e.target[1].value;
    let recurring = e.target[2].value === "true" ? true : false;
    let amount = e.target[3].value;
    let month = e.target[4].value ? parseInt(e.target[4].value) : e.target[4].value;

    await this.props.createExpense(
      this.state.accountId,
      this.state.incomeId,
      amount,
      description,
      transactionDescription,
      recurring,
      month
    )
    redirectTo(`/accounts/${this.state.accountId}/income/${this.state.incomeId}`);
  }

  transactionSearch() {
    console.log("I was clicked")
  }

  closeTransactionSearchModal() {

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
                <ReactTooltip />
                <Breadcrumb>
                  <BreadcrumbItem><a href="/accounts">Accounts</a></BreadcrumbItem>
                  <BreadcrumbItem><a href={`/accounts/${this.props.account.id}`}>{this.props.account.description}</a></BreadcrumbItem>
                  <BreadcrumbItem><a href={`/accounts/${this.props.account.id}/income/${this.props.income.id}`}>{this.props.income.description}</a></BreadcrumbItem>
                  <BreadcrumbItem active>Create Expense</BreadcrumbItem>
                </Breadcrumb>
                <div>
                  <h2 className="plutus-subheader">Create Expense</h2>
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
                        <Label for="transactionDescription">Transaction Description</Label>
                        <InputGroup>
                        <Input
                          type="text"
                          name="transactionDescription"
                          id="transactionDescription"
                          required
                        />
                        <Button onClick={this.transactionSearch}>
                          <FontAwesomeIcon icon={faSearch} data-tip='Find transaction' />
                        </Button>
                        </InputGroup>
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
                        <Label for="amount">Amount</Label>
                        <Input
                          type="number"
                          name="amount"
                          id="amount"
                          step="0.01"
                          required
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
                      <Button className="btn btn-success" type="submit">Add expense</Button>
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
  isFetching: state.accountsReducer.isFetching
    || state.expensesReducer.isFetching
    || state.incomeReducer.isFetching,
  accounts: state.accountsReducer.accounts,
  account: state.accountsReducer.account,
  income: state.incomeReducer.income
});

const mapActionsToProps = {
  popAlert,
  pushAlert,
  createExpense,
  getAccount,
  getIncome
}

export default connect(mapStateToProps, mapActionsToProps)(CreateExpense);