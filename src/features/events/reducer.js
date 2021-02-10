import {
  GET_EVENTS_WINDOW_REQUEST,
  GET_EVENTS_WINDOW_SUCCESS,
  GET_EVENTS_WINDOW_ERROR,
} from './actions';

export default function eventsReducer(
  state = {
    isFetching: false,
    events: [],
    error: null
  },
  action
) {
  switch(action.type) {
    case GET_EVENTS_WINDOW_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true
      };
    case GET_EVENTS_WINDOW_SUCCESS:
      return {
        ...state,
        isFetching: false,
        events: action.payload.events
      };
    case GET_EVENTS_WINDOW_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message
      }
    default:
      return state;
  }
}