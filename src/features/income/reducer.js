import {
  CREATE_INCOME_REQUEST,
  CREATE_INCOME_SUCCESS,
  CREATE_INCOME_ERROR,
  GET_ACCOUNT_INCOMES_REQUEST,
  GET_ACCOUNT_INCOMES_SUCCESS,
  GET_ACCOUNT_INCOMES_ERROR,
  GET_INCOME_REQUEST,
  GET_INCOME_SUCCESS,
  GET_INCOME_ERROR,
  DELETE_INCOME_REQUEST,
  DELETE_INCOME_SUCCESS,
  DELETE_INCOME_ERROR,
} from './actions';

export default function incomeReducer(
  state = {
    isFetching: false,
    income: {},
    incomes: [],
    error: null
  },
  action
) {
  switch(action.type) {
    case CREATE_INCOME_REQUEST:
    case GET_ACCOUNT_INCOMES_REQUEST:
    case GET_INCOME_REQUEST:
    case DELETE_INCOME_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true
      };
    case CREATE_INCOME_SUCCESS:
      return {
        ...state,
        isFetching: false,
        income: action.payload.income
      };
    case GET_ACCOUNT_INCOMES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        incomes: action.payload.incomes
      };
    case GET_INCOME_SUCCESS:
      return {
        ...state,
        isFetching: false,
        income: action.payload.income
      }
    case DELETE_INCOME_SUCCESS:
      return {
        ...state,
        isFetching: false
      }
    case CREATE_INCOME_ERROR:
    case GET_ACCOUNT_INCOMES_ERROR:
    case GET_INCOME_ERROR:
    case DELETE_INCOME_ERROR: 
      return {
        ...state,
        isFetching: false,
        error: action.payload.message
      }
    default:
      return state;
  }
}