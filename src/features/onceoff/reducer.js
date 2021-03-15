import {
  CREATE_ONCE_OFF_REQUEST,
  CREATE_ONCE_OFF_SUCCESS,
  CREATE_ONCE_OFF_ERROR,
  GET_ONCE_OFFS_REQUEST,
  GET_ONCE_OFFS_SUCCESS,
  GET_ONCE_OFFS_ERROR,
} from './actions';

export default function onceOffReducer(
  state = {
    isFetching: false,
    onceOffs: [],
    error: null,
    onceOff: {}
  },
  action
) {
  switch(action.type) {
    case CREATE_ONCE_OFF_REQUEST:
    case GET_ONCE_OFFS_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true
      }
    case CREATE_ONCE_OFF_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case GET_ONCE_OFFS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        onceOffs: action.payload.once_offs
      }
    case CREATE_ONCE_OFF_ERROR:
    case GET_ONCE_OFFS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message
      };
    default: 
      return state;
  }
}