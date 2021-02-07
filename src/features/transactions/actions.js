import {
  doGetAccountTransactionsRequest
} from './util';

export const GET_ACCOUNT_TRANSACTIONS_REQUEST = 'getAccountTransactionsRequest';
export const GET_ACCOUNT_TRANSACTIONS_SUCCESS = 'getAccountTransactionsSuccess';
export const GET_ACCOUNT_TRANSACTIONS_ERROR = 'getAccountTransactionsError';


export function getAccountTransactionsRequest() {
  return {
    type: GET_ACCOUNT_TRANSACTIONS_REQUEST
  };
}

export function getAccountTransactionsSuccess(data) {
  return {
    type: GET_ACCOUNT_TRANSACTIONS_SUCCESS,
    payload: data
  };
}

export function getAccountTransactionsError(error) {
  return {
    type: GET_ACCOUNT_TRANSACTIONS_ERROR,
    payload: error
  }
};

export function getAccountTransactions(accountId) {
  return async (dispatch) => {
    try {
      dispatch(getAccountTransactionsRequest());
      const result = await doGetAccountTransactionsRequest(
        accountId
      );
      dispatch(getAccountTransactionsSuccess(result.data));
    } catch (e) {
      dispatch(getAccountTransactionsError(e));
    }
  };
};