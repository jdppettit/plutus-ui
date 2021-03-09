import {
  doGetEventsWindowRequest,
  doUpdateEventRequest,
  doUpdateEventAmountRequest,
  doUpdateEventSettledRequest,
  doCreateEventRequest,
  doDeleteEventRequest,
} from './util';

export const GET_EVENTS_WINDOW_REQUEST = 'getEventsWindowRequest';
export const GET_EVENTS_WINDOW_SUCCESS = 'getEventsWindowSuccess';
export const GET_EVENTS_WINDOW_ERROR = 'getEventsWindowError';

export const UPDATE_EVENT_REQUEST = 'updateEventRequest';
export const UPDATE_EVENT_SUCCESS = 'updateEventSuccess';
export const UPDATE_EVENT_ERROR = 'updateEventError';

export const CREATE_EVENT_REQUEST = 'createEventRequest';
export const CREATE_EVENT_SUCCESS = 'createEventSuccess';
export const CREATE_EVENT_ERROR = 'createEventError';

export const DELETE_EVENT_REQUEST = 'deleteEventRequest';
export const DELETE_EVENT_SUCCESS = 'deleteEventSuccess';
export const DELETE_EVENT_ERROR = 'deleteEventError';

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

export function updateEventSettled(accountId, eventId, settled) {
  return async (dispatch) => {
    try {
      dispatch(updateEventRequest());
      const result = await doUpdateEventSettledRequest(
        accountId,
        eventId,
        settled
      );
      dispatch(updateEventSuccess(result.data));
    } catch (e) {
      dispatch(updateEventError(e));
    }
  };
};

export function createEventRequest() {
  return {
    type: CREATE_EVENT_REQUEST
  };
}

export function createEventSuccess(data) {
  return {
    type: CREATE_EVENT_SUCCESS,
    payload: data
  };
}

export function createEventError(error) {
  return {
    type: CREATE_EVENT_ERROR,
    payload: error
  }
};

export function createEvent(
  accountId,
  parentId,
  description,
  amount,
  type,
  autoSettle,
  anticipatedDate
) {
  return async (dispatch) => {
    try {
      dispatch(createEventRequest());
      const result = await doCreateEventRequest(
        accountId,
        parentId,
        description,
        amount,
        type,
        autoSettle,
        anticipatedDate
      );
      dispatch(createEventSuccess(result.data));
    } catch (e) {
      dispatch(createEventError(e));
    }
  };
};

export function deleteEventRequest() {
  return {
    type: DELETE_EVENT_REQUEST
  };
}

export function deleteEventSuccess(data) {
  return {
    type: DELETE_EVENT_SUCCESS,
    payload: data
  };
}

export function deleteEventError(error) {
  return {
    type: DELETE_EVENT_ERROR,
    payload: error
  }
};

export function deleteEvent(
  accountId,
  eventId
) {
  return async (dispatch) => {
    try {
      dispatch(deleteEventRequest());
      const result = await doDeleteEventRequest(
        accountId,
        eventId
      );
      dispatch(deleteEventSuccess(result.data));
    } catch (e) {
      dispatch(deleteEventError(e));
    }
  };
};