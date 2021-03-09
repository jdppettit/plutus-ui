import {
  GET_EVENTS_WINDOW_REQUEST,
  GET_EVENTS_WINDOW_SUCCESS,
  GET_EVENTS_WINDOW_ERROR,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_ERROR,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_ERROR,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_ERROR,
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
    case UPDATE_EVENT_REQUEST:
    case CREATE_EVENT_REQUEST:
    case DELETE_EVENT_REQUEST:
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
    case UPDATE_EVENT_SUCCESS:
    case CREATE_EVENT_SUCCESS:
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        isFetching: false
      }
    case GET_EVENTS_WINDOW_ERROR:
    case UPDATE_EVENT_ERROR:
    case CREATE_EVENT_ERROR: 
    case DELETE_EVENT_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message
      }
    default:
      return state;
  }
}