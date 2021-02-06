import { 
  doLinkTokenRequest,
  doCreateAccountRequest,
  doGetAccountsRequest
} from './util';

export const GET_LINK_TOKEN_REQUEST = 'getLinkTokenRequest';
export const GET_LINK_TOKEN_SUCCESS = 'getLinkTokenSuccess';
export const GET_LINK_TOKEN_ERROR = 'getLinkTokenError';

export const CREATE_ACCOUNT_REQUEST = 'createAccountRequest';
export const CREATE_ACCOUNT_SUCCESS = 'createAccountSuccess';
export const CREATE_ACCOUNT_ERROR = 'createAccountError';

export const GET_ACCOUNTS_REQUEST = 'getAccountsRequest';
export const GET_ACCOUNTS_SUCCESS = 'getAccountsSuccess';
export const GET_ACCOUNTS_ERROR = 'getAccountsError';

export function getLinkTokenRequest() {
  return {
    type: GET_LINK_TOKEN_REQUEST
  };
}

export function getLinkTokenSuccess(data) {
  return {
    type: GET_LINK_TOKEN_SUCCESS,
    payload: data
  };
}

export function getLinkTokenError(error) {
  return {
    type: GET_LINK_TOKEN_ERROR,
    payload: error
  };
}

export function getLinkToken() {
  return async (dispatch) => {
    try {
      dispatch(getLinkTokenRequest());
      const result = await doLinkTokenRequest();
      dispatch(getLinkTokenSuccess(result.data));
    } catch (e) {
      dispatch(getLinkTokenError(e));
    }
  }
}

export function createAccountRequest() {
  return {
    type: CREATE_ACCOUNT_REQUEST
  };
}

export function createAccountSuccess(data) {
  return {
    type: CREATE_ACCOUNT_SUCCESS,
    payload: data
  };
}

export function createAccountError(error) {
  return {
    type: CREATE_ACCOUNT_ERROR,
    payload: error
  };
}

export function createAccount(publicToken, description, accountName, lastFour, remoteId) {
  return async (dispatch) => {
    try {
      dispatch(createAccountRequest());
      const result = await doCreateAccountRequest(publicToken, description, accountName, lastFour, remoteId);
      dispatch(createAccountSuccess(result.data));
    } catch (e) {
      dispatch(createAccountError(e));
    }
  }
}

export function getAccountsRequest() {
  return {
    type: GET_ACCOUNTS_REQUEST
  };
}

export function getAccountsSuccess(data) {
  return {
    type: GET_ACCOUNTS_SUCCESS,
    payload: data
  };
}

export function getAccountsError(error) {
  return {
    type: GET_ACCOUNTS_ERROR,
    payload: error
  };
}

export function getAccounts() {
  return async (dispatch) => {
    try {
      dispatch(getAccountsRequest());
      const result = await doGetAccountsRequest();
      dispatch(getAccountsSuccess(result.data));
    } catch (e) {
      dispatch(getAccountsError(e));
    }
  }
}