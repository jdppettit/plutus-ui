import {
  GET_ACCOUNT_TRANSACTIONS_REQUEST,
  GET_ACCOUNT_TRANSACTIONS_SUCCESS,
  GET_ACCOUNT_TRANSACTIONS_ERROR,
  GET_TRANSACTIONS_WINDOW_REQUEST,
  GET_TRANSACTIONS_WINDOW_SUCCESS,
  GET_TRANSACTIONS_WINDOW_ERROR
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
    case GET_TRANSACTIONS_WINDOW_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true
      };
    case GET_ACCOUNT_TRANSACTIONS_SUCCESS:
    case GET_TRANSACTIONS_WINDOW_SUCCESS:
      return {
        ...state,
        isFetching: false,
        transactions: action.payload.transactions
      };
    case GET_ACCOUNT_TRANSACTIONS_ERROR:
    case GET_TRANSACTIONS_WINDOW_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message
      }
    default:
      return state;
  }
}