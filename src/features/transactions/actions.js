import {
  doGetAccountTransactionsRequest,
  doGetTransactionsWindowRequest
} from './util';

export const GET_ACCOUNT_TRANSACTIONS_REQUEST = 'getAccountTransactionsRequest';
export const GET_ACCOUNT_TRANSACTIONS_SUCCESS = 'getAccountTransactionsSuccess';
export const GET_ACCOUNT_TRANSACTIONS_ERROR = 'getAccountTransactionsError';

export const GET_TRANSACTIONS_WINDOW_REQUEST = 'getTransactionsWindowRequest';
export const GET_TRANSACTIONS_WINDOW_SUCCESS = 'getTransactionsWindowSuccess';
export const GET_TRANSACTIONS_WINDOW_ERROR = 'getTransactionsWindowError';


export function getTransactionsWindowRequest() {
  return {
    type: GET_TRANSACTIONS_WINDOW_REQUEST
  };
}

export function getTransactionsWindowSuccess(data) {
  return {
    type: GET_TRANSACTIONS_WINDOW_SUCCESS,
    payload: data
  };
}

export function getTransactionsWindowError(error) {
  return {
    type: GET_TRANSACTIONS_WINDOW_ERROR,
    payload: error
  }
};

export function getTransactionsWindow(accountId, windowStart, windowEnd) {
  return async (dispatch) => {
    try {
      dispatch(getTransactionsWindowRequest());
      const result = await doGetTransactionsWindowRequest(
        accountId,
        windowStart,
        windowEnd
      );
      dispatch(getTransactionsWindowSuccess(result.data));
    } catch (e) {
      dispatch(getTransactionsWindowError(e));
    }
  };
};


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