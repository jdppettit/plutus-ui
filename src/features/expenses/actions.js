import {
  doGetIncomeExpensesRequest,
  doCreateExpenseRequest,
  doGetExpenseRequest,
  doUpdateExpenseRequest
} from './util';

export const GET_INCOME_EXPENSES_REQUEST = 'getIncomeExpensesRequest';
export const GET_INCOME_EXPENSES_SUCCESS = 'getIncomeExpensesSuccess';
export const GET_INCOME_EXPENSES_ERROR = 'getIncomeExpensesError';

export const CREATE_EXPENSE_REQUEST = 'createExpenseRequest';
export const CREATE_EXPENSE_SUCCESS = 'createExpenseSuccess';
export const CREATE_EXPENSE_ERROR = 'createExpenseError';

export const GET_EXPENSE_REQUEST = 'getExpenseRequest';
export const GET_EXPENSE_SUCCESS = 'getExpenseSuccess';
export const GET_EXPENSE_ERROR = 'getExpenseError';

export const UPDATE_EXPENSE_REQUEST = 'updateExpenseRequest';
export const UPDATE_EXPENSE_SUCCESS = 'updateExpenseSuccess';
export const UPDATE_EXPENSE_ERROR = 'updateExpenseError';


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

export function createExpense(
  accountId, 
  incomeId, 
  amount, 
  description, 
  transactionDescription,
  recurring,
  month
) {
  return async (dispatch) => {
    try {
      dispatch(createExpenseRequest());
      const result = await doCreateExpenseRequest(
        accountId,
        incomeId,
        amount,
        description,
        transactionDescription,
        recurring,
        month
      );
      dispatch(createExpenseSuccess(result.data));
    } catch (e) {
      dispatch(createExpenseError(e));
    }
  };
};

export function getExpenseRequest() {
  return {
    type: GET_EXPENSE_REQUEST
  };
}

export function getExpenseSuccess(data) {
  return {
    type: GET_EXPENSE_SUCCESS,
    payload: data
  };
}

export function getExpenseError(error) {
  return {
    type: GET_EXPENSE_ERROR,
    payload: error
  }
};

export function getExpense(
  accountId, 
  incomeId, 
  expenseId
) {
  return async (dispatch) => {
    try {
      dispatch(getExpenseRequest());
      const result = await doGetExpenseRequest(
        accountId,
        incomeId,
        expenseId
      );
      dispatch(getExpenseSuccess(result.data));
    } catch (e) {
      dispatch(getExpenseError(e));
    }
  };
};

export function updateExpenseRequest() {
  return {
    type: UPDATE_EXPENSE_REQUEST
  };
}

export function updateExpenseSuccess(data) {
  return {
    type: UPDATE_EXPENSE_SUCCESS,
    payload: data
  };
}

export function updateExpenseError(error) {
  return {
    type: UPDATE_EXPENSE_ERROR,
    payload: error
  }
};

export function updateExpense(
  accountId, 
  incomeId, 
  expenseId,
  amount, 
  description, 
  transactionDescription,
  recurring,
  month
) {
  return async (dispatch) => {
    try {
      dispatch(updateExpenseRequest());
      const result = await doUpdateExpenseRequest(
        accountId,
        incomeId,
        expenseId,
        amount,
        description,
        transactionDescription,
        recurring,
        month
      );
      dispatch(updateExpenseSuccess(result.data));
    } catch (e) {
      dispatch(updateExpenseError(e));
    }
  };
};