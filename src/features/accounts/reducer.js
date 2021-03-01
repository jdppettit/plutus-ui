import {
  GET_LINK_TOKEN_REQUEST,
  GET_LINK_TOKEN_SUCCESS,
  GET_LINK_TOKEN_ERROR,
  CREATE_ACCOUNT_REQUEST,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,
  GET_ACCOUNTS_REQUEST,
  GET_ACCOUNTS_SUCCESS,
  GET_ACCOUNTS_ERROR, 
  GET_ACCOUNT_REQUEST,
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_ERROR,
  REFRESH_DATA_REQUEST,
  REFRESH_DATA_SUCCESS,
  REFRESH_DATA_ERROR,
} from './actions';

export default function accountsReducer(
  state = {
    isFetching: false,
    linkToken: null,
    error: null,
    accounts: [],
    account: {}
  },
  action
) {
  switch(action.type) {
    case GET_LINK_TOKEN_REQUEST:
    case CREATE_ACCOUNT_REQUEST:
    case GET_ACCOUNTS_REQUEST:
    case GET_ACCOUNT_REQUEST:
    case REFRESH_DATA_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true
      };
    case GET_LINK_TOKEN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        linkToken: action.payload.linkToken
      };
    case CREATE_ACCOUNT_SUCCESS:
    case REFRESH_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case GET_ACCOUNTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        accounts: action.payload.accounts
      };
    case GET_ACCOUNT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        account: action.payload.account
      };
    case GET_LINK_TOKEN_ERROR:
    case CREATE_ACCOUNT_ERROR:
    case GET_ACCOUNTS_ERROR:
    case GET_ACCOUNT_ERROR:
    case REFRESH_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message
      };
    default:
      return state;
  }
}
