import {
  GET_INCOME_EXPENSES_REQUEST,
  GET_INCOME_EXPENSES_SUCCESS,
  GET_INCOME_EXPENSES_ERROR,
  CREATE_EXPENSE_REQUEST,
  CREATE_EXPENSE_SUCCESS,
  CREATE_EXPENSE_ERROR
} from './actions';

export default function expensesReducer(
  state = {
    isFetching: false,
    expenses: [],
    error: null
  },
  action
) {
  switch(action.type) {
    case GET_INCOME_EXPENSES_REQUEST:
    case CREATE_EXPENSE_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true
      };
    case GET_INCOME_EXPENSES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        expenses: action.payload.expenses
      };
    case CREATE_EXPENSE_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case GET_INCOME_EXPENSES_ERROR:
    case CREATE_EXPENSE_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message
      }
    default:
      return state;
  }
}