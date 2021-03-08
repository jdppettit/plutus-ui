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

class AccountSettings extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    let account = this.props.account || {}
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
                value={account.description}
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
                value={account.balance_to_maintain}
              />
            </FormGroup>
            <FormGroup> 
              <Label for="includeInBalance">Include in overall balance</Label>
              <Input 
                type="select" 
                name="includeInBalance" 
                id="includeInBalance"
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

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(AccountSettings);