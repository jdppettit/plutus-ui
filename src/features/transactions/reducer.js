import {
  GET_ACCOUNT_TRANSACTIONS_REQUEST,
  GET_ACCOUNT_TRANSACTIONS_SUCCESS,
  GET_ACCOUNT_TRANSACTIONS_ERROR
} from './actions';

export default function transactionsReducer(
  state = {
    isFetching: false,
    transactions: [],
    error: null
  },
  action
) {
  switch(action.type) {
    case GET_ACCOUNT_TRANSACTIONS_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true
      };
    case GET_ACCOUNT_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        transactions: action.payload.transactions
      };
    case GET_ACCOUNT_TRANSACTIONS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message
      }
    default:
      return state;
  }
}