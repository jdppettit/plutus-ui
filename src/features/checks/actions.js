import { allChecksRequest } from './util'

export const GET_ALL_CHECKS_REQUEST = 'getAllChecksRequest';
export const GET_ALL_CHECKS_SUCCESS = 'getAllChecksSuccess';
export const GET_ALL_CHECKS_ERROR = 'getAllChecksError';

export function getAllChecksRequest() {
  return {
    type: GET_ALL_CHECKS_REQUEST
  };
}

export function getAllChecksSuccess(data) {
  return {
    type: GET_ALL_CHECKS_SUCCESS,
    payload: data
  }
}

export function getAllChecksError(error) {
  return {
    type: GET_ALL_CHECKS_ERROR,
    payload: error
  }
}

export function getAllChecks() {
  return async (dispatch) => {
    try {
      dispatch(getAllChecksRequest());
      const result = await allChecksRequest();
      dispatch(getAllChecksSuccess(result.data));
    } catch (e) {
      dispatch(getAllChecksError(e))
    }
  }
}
