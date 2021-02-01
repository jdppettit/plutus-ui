import {
  GET_LINK_TOKEN_REQUEST,
  GET_LINK_TOKEN_SUCCESS,
  GET_LINK_TOKEN_ERROR,
  SET_PUBLIC_TOKEN_REQUEST,
  SET_PUBLIC_TOKEN_SUCCESS,
  SET_PUBLIC_TOKEN_ERROR,
} from './actions';

export default function accountsReducer(
  state = {
    isFetching: false,
    linkToken: null,
    error: null
  },
  action
) {
  switch(action.type) {
    case GET_LINK_TOKEN_REQUEST:
    case SET_PUBLIC_TOKEN_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true
      };
    case GET_LINK_TOKEN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        linkToken: action.payload.linkToken
      };
    case SET_PUBLIC_TOKEN_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case GET_LINK_TOKEN_ERROR:
    case SET_PUBLIC_TOKEN_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message
      };
    default:
      return state;
  }
}
