import {
  doGetEventsWindowRequest,
  doUpdateEventRequest,
  doUpdateEventAmountRequest,
} from './util';

export const GET_EVENTS_WINDOW_REQUEST = 'getEventsWindowRequest';
export const GET_EVENTS_WINDOW_SUCCESS = 'getEventsWindowSuccess';
export const GET_EVENTS_WINDOW_ERROR = 'getEventsWindowError';

export const UPDATE_EVENT_REQUEST = 'updateEventRequest';
export const UPDATE_EVENT_SUCCESS = 'updateEventSuccess';
export const UPDATE_EVENT_ERROR = 'updateEventError';

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

export function updateEventRequest() {
  return {
    type: UPDATE_EVENT_REQUEST
  };
}

export function updateEventSuccess(data) {
  return {
    type: UPDATE_EVENT_SUCCESS,
    payload: data
  };
}

export function updateEventError(error) {
  return {
    type: UPDATE_EVENT_ERROR,
    payload: error
  }
};

export function updateEvent(accountId, eventId) {
  return async (dispatch) => {
    try {
      dispatch(updateEventRequest());
      const result = await doUpdateEventRequest(
        accountId,
        eventId
      );
      dispatch(updateEventSuccess(result.data));
    } catch (e) {
      dispatch(updateEventError(e));
    }
  };
};

export function updateEventAmount(accountId, eventId, amount) {
  return async (dispatch) => {
    try {
      dispatch(updateEventRequest());
      const result = await doUpdateEventAmountRequest(
        accountId,
        eventId,
        amount
      );
      dispatch(updateEventSuccess(result.data));
    } catch (e) {
      dispatch(updateEventError(e));
    }
  };
};