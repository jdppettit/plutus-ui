import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  Button,
  Table,
  Input
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { 
  formatMoney, 
} from '../../util/money';
import ReactTooltip from 'react-tooltip';
import { getTransactionsWindow } from '../../features/transactions/actions';
import moment from 'moment';

class TransactionSearchModal extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      modalIsOpen: false,
      selectedTransaction: "",
      currentMonthWindow: moment().format('MMMM, YYYY'),
      lastMonthWindow: moment().subtract(1, 'month').format('MMMM, YYYY'),
      searchResults: [],
    }
  }

  async componentDidMount() {
    let startWindow = moment(this.state.lastMonthWindow, 'MMMM, YYYY').clone().startOf('month').format('YYYY-MM-DD');
    let endWindow = moment(this.state.currentMonthWindow, 'MMMM, YYYY').clone().endOf('month').format('YYYY-MM-DD');

    await this.props.getTransactionsWindow(this.props.accountId, startWindow, endWindow);
  }

  async handleSearch(e) {
    let searchResults = [];
    let search = e.target.value.toLowerCase();
    if (e.target && e.target.value) {
      this.props.transactions.forEach(transaction => {
        if(transaction.description.toLowerCase().includes(search) || 
           search.toLowerCase().includes(transaction.description)
        ) {
          searchResults.push(transaction);
        }
      });
    }
    await this.setState({
      searchResults
    })
  }

  generateReturnedValues() {
    return (
    this.state.searchResults.forEach(result => {
      return (
        <tr>
          <td>{ result.description }</td>
          <td>{ result.amount}</td>
        </tr>
      )
    })
    )
  }

  render() {
    return (
      <div>
        <ReactTooltip />
        <Modal
          isOpen={this.props.modalIsOpen}
        >
          <div style={{ padding: "1em" }}>
            <div>
            <div style={{ textAlign: "right"}}>
                <FontAwesomeIcon icon={faTimes} color="grey" onClick={this.props.modalDismiss}/>
              </div>
                <h2>Search Transactions</h2>
            </div>
            <Input placeholder="Search..." type="text" name="search" id="search" onChange={this.handleSearch} />
            <Table>
              <tbody>
              {this.state.searchResults.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{value.date}</td>
                    <td>{value.description}</td>
                    <td>{formatMoney(value.amount)}</td>
                    <td><Button onClick={() => this.props.sendTransaction(value.description)}>Select</Button></td>
                  </tr>
                )
              })}
              </tbody>
            </Table>
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  transactions: state.transactionsReducer.transactions,
  isFetching: state.transactionsReducer.isFetching,
});

const mapActionsToProps = {
  getTransactionsWindow
}

export default connect(mapStateToProps, mapActionsToProps)(TransactionSearchModal);