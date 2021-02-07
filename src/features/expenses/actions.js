import {
  doGetIncomeExpensesRequest,
  doCreateExpenseRequest,
} from './util';

export const GET_INCOME_EXPENSES_REQUEST = 'getIncomeExpensesRequest';
export const GET_INCOME_EXPENSES_SUCCESS = 'getIncomeExpensesSuccess';
export const GET_INCOME_EXPENSES_ERROR = 'getIncomeExpensesError';

export const CREATE_EXPENSE_REQUEST = 'createExpenseRequest';
export const CREATE_EXPENSE_SUCCESS = 'createExpenseSuccess';
export const CREATE_EXPENSE_ERROR = 'createExpenseError';

export function getIncomeExpensesRequest() {
  return {
    type: GET_INCOME_EXPENSES_REQUEST
  };
}

export function getIncomeExpensesSuccess(data) {
  return {
    type: GET_INCOME_EXPENSES_SUCCESS,
    payload: data
  };
}

export function getIncomeExpensesError(error) {
  return {
    type: GET_INCOME_EXPENSES_ERROR,
    payload: error
  }
};

export function getIncomeExpenses(accountId, incomeId) {
  return async (dispatch) => {
    try {
      dispatch(getIncomeExpensesRequest());
      const result = await doGetIncomeExpensesRequest(
        accountId,
        incomeId
      );
      dispatch(getIncomeExpensesSuccess(result.data));
    } catch (e) {
      dispatch(getIncomeExpensesError(e));
    }
  };
};

export function createExpenseRequest() {
  return {
    type: CREATE_EXPENSE_REQUEST
  };
}

export function createExpenseSuccess(data) {
  return {
    type: CREATE_EXPENSE_SUCCESS,
    payload: data
  };
}

export function createExpenseError(error) {
  return {
    type: CREATE_EXPENSE_ERROR,
    payload: error
  }
};

export function createExpense(accountId, incomeId, amount, description) {
  return async (dispatch) => {
    try {
      dispatch(createExpenseRequest());
      const result = await doCreateExpenseRequest(
        accountId,
        incomeId,
        amount,
        description
      );
      dispatch(createExpenseSuccess(result.data));
    } catch (e) {
      dispatch(createExpenseError(e));
    }
  };
};