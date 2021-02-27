import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from '../../components/navigation';
import { deleteIncome } from '../../features/income/actions';
import {
  Container,
} from 'reactstrap';
import Loading from '../../components/Loading';
import { redirectTo } from '../../util/general';

class DeleteIncome extends Component {
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
  }

  async componentDidMount() {
    await this.props.deleteIncome(
        this.state.accountId,
        this.state.incomeId
    )
    redirectTo(`/accounts/${this.state.accountId}`)
  }

  render() {
    return (
      <div>
        <Navigation />
        <Container>
          {this.props.isFetching
            ? <Loading />
            : (
              <div></div>
            )
          }
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: state.incomeReducer.isFetching
});

const mapActionsToProps = {
  deleteIncome
}

export default connect(mapStateToProps, mapActionsToProps)(DeleteIncome);