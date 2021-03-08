import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import { updateAccount } from '../../features/accounts/actions';
import { redirectTo } from '../../util/general';

class AccountSettings extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleBalanceChange = this.handleBalanceChange.bind(this);
    this.handleIncludeInChange = this.handleIncludeInChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);

    this.state = {
      description: this.props.account.description,
      accountType: `${this.props.account.type}`,
      balanceToMaintain: this.props.account.balance_to_maintain,
      includeInOverall: `${this.props.account.include_in_overall}`
    }
  }

  async onSubmit(e) {
    e.preventDefault();
    let description = this.state.description;
    let balanceToMaintain = this.state.balanceToMaintain;
    let includeInOverall = this.state.includeInOverall === "true" ? true : false;
    let accountType = this.state.accountType;

    if (accountType === "null") { accountType = null; }

    await this.props.updateAccount(
      this.props.account.id,
      description,
      accountType,
      balanceToMaintain,
      includeInOverall
    )

    redirectTo(`/accounts/${this.props.account.id}`)
  }

  handleDescriptionChange(e) {
    if(e.target) {
      this.setState({description: e.target.value})
    }
  }

  handleBalanceChange(e) {
    if(e.target) {
      this.setState({balanceToMaintain: e.target.value})
    }
  }

  handleIncludeInChange(e) {
    if(e.target && e.target.value) {
      this.setState({includeInOverall: e.target.value})
    }
  }

  handleTypeChange(e) {
    if(e.target && e.target.value) {
      this.setState({accountType: e.target.value})
    }
  }

  render() {
    return (
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
                value={this.state.description}
                onChange={this.handleDescriptionChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="balanceToMaintain">Balance to maintain</Label>
              <Input
                type="number"
                step="0.01"
                name="balanceToMaintain"
                id="balanceToMaintain"
                required
                value={this.state.balanceToMaintain}
                onChange={this.handleBalanceChange}
              />
            </FormGroup>
            <FormGroup> 
              <Label for="includeInBalance">Include in overall balance</Label>
              <Input 
                type="select" 
                name="includeInBalance" 
                id="includeInBalance"
                value={this.state.includeInOverall}
                onChange={this.handleIncludeInChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Input>
            </FormGroup>
            <FormGroup> 
              <Label for="accountType">Account type</Label>
              <Input 
                type="select" 
                name="accountType" 
                id="accountType"
                value={this.state.accountType}
                onChange={this.handleTypeChange}
              >
                <option value="depository">Depository</option>
                <option value="credit">Credit</option>
                <option value="loan">Loan</option>
                <option value="other">Other</option>
                <option value="null">None/Unset</option>
              </Input>
            </FormGroup>
            <Button className="btn btn-success" type="submit">Save</Button>
          </Form>
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: state.accountsReducer.isFetching,
  accounts: state.accountsReducer.accounts,
  account: state.accountsReducer.account, 
});

const mapActionsToProps = {
  updateAccount
}

export default connect(mapStateToProps, mapActionsToProps)(AccountSettings);