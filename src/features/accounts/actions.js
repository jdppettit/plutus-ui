import { 
  linkTokenRequest,
  publicTokenRequest
} from './util';

export const GET_LINK_TOKEN_REQUEST = 'getLinkTokenRequest';
export const GET_LINK_TOKEN_SUCCESS = 'getLinkTokenSuccess';
export const GET_LINK_TOKEN_ERROR = 'getLinkTokenError';

export const SET_PUBLIC_TOKEN_REQUEST = 'setPublicTokenRequest';
export const SET_PUBLIC_TOKEN_SUCCESS = 'setPublicTokenSuccess';
export const SET_PUBLIC_TOKEN_ERROR = 'setPublicTokenError';

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
      const result = await linkTokenRequest();
      dispatch(getLinkTokenSuccess(result.data));
    } catch (e) {
      dispatch(getLinkTokenError(e));
    }
  }
}

export function setPublicTokenRequest() {
  return {
    type: SET_PUBLIC_TOKEN_REQUEST
  };
}

export function setPublicTokenSuccess(data) {
  return {
    type: SET_PUBLIC_TOKEN_SUCCESS,
    payload: data
  };
}

export function setPublicTokenError(error) {
  return {
    type: SET_PUBLIC_TOKEN_ERROR,
    payload: error
  };
}

export function setPublicToken(publicToken, description) {
  return async (dispatch) => {
    try {
      dispatch(setPublicTokenRequest());
      const result = await publicTokenRequest(publicToken, description);
      dispatch(setPublicTokenSuccess(result.data));
    } catch (e) {
      dispatch(setPublicTokenError(e));
    }
  }
}