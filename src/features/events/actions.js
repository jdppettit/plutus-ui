import {
  doGetEventsWindowRequest,
} from './util';

export const GET_EVENTS_WINDOW_REQUEST = 'getEventsWindowRequest';
export const GET_EVENTS_WINDOW_SUCCESS = 'getEventsWindowSuccess';
export const GET_EVENTS_WINDOW_ERROR = 'getEventsWindowError';

export function getEventsWindowRequest() {
  return {
    type: GET_EVENTS_WINDOW_REQUEST
  };
}

export function getEventsWindowSuccess(data) {
  return {
    type: GET_EVENTS_WINDOW_SUCCESS,
    payload: data
  };
}

export function getEventsWindowError(error) {
  return {
    type: GET_EVENTS_WINDOW_ERROR,
    payload: error
  }
};

export function getEventsWindow(accountId, windowStart, windowEnd) {
  return async (dispatch) => {
    try {
      dispatch(getEventsWindowRequest());
      const result = await doGetEventsWindowRequest(
        accountId,
        windowStart,
        windowEnd
      );
      dispatch(getEventsWindowSuccess(result.data));
    } catch (e) {
      dispatch(getEventsWindowError(e));
    }
  };
};