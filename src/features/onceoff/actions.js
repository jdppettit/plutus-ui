import {
  doCreateOnceOffRequest,
  doGetOnceOffsRequest,
} from './util';

export const CREATE_ONCE_OFF_REQUEST = 'createOnceOffRequest';
export const CREATE_ONCE_OFF_SUCCESS = 'createOnceOffSuccess';
export const CREATE_ONCE_OFF_ERROR = 'createOnceOffError';

export const GET_ONCE_OFFS_REQUEST = 'getOnceOffsRequest';
export const GET_ONCE_OFFS_SUCCESS = 'getOnceOffsSuccess';
export const GET_ONCE_OFFS_ERROR = 'getOnceOffsError';

export function createOnceOffRequest() {
  return {
    type: CREATE_ONCE_OFF_REQUEST
  };
}

export function createOnceOffSuccess(data) {
  return {
    type: CREATE_ONCE_OFF_SUCCESS,
    payload: data
  };
}

export function createOnceOffError(error) {
  return {
    type: CREATE_ONCE_OFF_ERROR,
    payload: error
  }
};

export function createOnceOff(accountId) {
  return async (dispatch) => {
    try {
      dispatch(createOnceOffRequest());
      const result = await doCreateOnceOffRequest(
        accountId,
      );
      dispatch(createOnceOffSuccess(result.data));
    } catch (e) {
      dispatch(createOnceOffError(e));
    }
  };
};

export function getOnceOffsRequest() {
  return {
    type: GET_ONCE_OFFS_REQUEST
  };
}

export function getOnceOffsSuccess(data) {
  return {
    type: GET_ONCE_OFFS_SUCCESS,
    payload: data
  };
}

export function getOnceOffsError(error) {
  return {
    type: GET_ONCE_OFFS_ERROR,
    payload: error
  }
};

export function getOnceOffs(accountId) {
  return async (dispatch) => {
    try {
      dispatch(getOnceOffsRequest());
      const result = await doGetOnceOffsRequest(
        accountId,
      );
      dispatch(getOnceOffsSuccess(result.data));
    } catch (e) {
      dispatch(getOnceOffsError(e));
    }
  };
};