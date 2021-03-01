import { 
  doLinkTokenRequest,
  doCreateAccountRequest,
  doGetAccountsRequest,
  doGetAccountRequest,
  doRefreshDataRequest
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

export const GET_ACCOUNT_REQUEST = 'getAccountRequest';
export const GET_ACCOUNT_SUCCESS = 'getAccountSuccess';
export const GET_ACCOUNT_ERROR = 'getAccountError';

export const REFRESH_DATA_REQUEST = 'refreshDataRequest';
export const REFRESH_DATA_SUCCESS = 'refreshDataSuccess';
export const REFRESH_DATA_ERROR = 'refreshDataError';

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

export function getAccountRequest() {
  return {
    type: GET_ACCOUNT_REQUEST
  };
}

export function getAccountSuccess(data) {
  return {
    type: GET_ACCOUNT_SUCCESS,
    payload: data
  };
}

export function getAccountError(error) {
  return {
    type: GET_ACCOUNT_ERROR,
    payload: error
  };
}

export function getAccount(accountId) {
  return async (dispatch) => {
    try {
      dispatch(getAccountRequest());
      const result = await doGetAccountRequest(accountId);
      dispatch(getAccountSuccess(result.data));
    } catch (e) {
      dispatch(getAccountError(e));
    }
  }
}

export function refreshDataRequest() {
  return {
    type: REFRESH_DATA_REQUEST
  };
}

export function refreshDataSuccess(data) {
  return {
    type: REFRESH_DATA_SUCCESS,
    payload: data
  };
}

export function refreshDataError(error) {
  return {
    type: REFRESH_DATA_ERROR,
    payload: error
  };
}

export function refreshData(accountId) {
  return async (dispatch) => {
    try {
      dispatch(refreshDataRequest());
      const result = await doRefreshDataRequest(accountId);
      dispatch(refreshDataSuccess(result.data));
    } catch (e) {
      dispatch(refreshDataError(e));
    }
  }
}