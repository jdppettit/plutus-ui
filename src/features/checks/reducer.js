import {
  GET_ALL_CHECKS_REQUEST,
  GET_ALL_CHECKS_SUCCESS,
  GET_ALL_CHECKS_ERROR
} from './actions';

export default function checksReducer(
  state = {
    isFetching: false,
    checks: [],
    error: null
  },
  action
) {
  switch(action.type) {
    case GET_ALL_CHECKS_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true
      };
    case GET_ALL_CHECKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        checks: action.payload.checks
      };
    case GET_ALL_CHECKS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message
      };
    default:
      return state;
  }
}
