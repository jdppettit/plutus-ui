import {
  doCreateIncomeRequest,
  doGetAccountIncomesRequest,
  doGetIncomeRequest,
  doDeleteIncomeRequest,
} from './util';

export const CREATE_INCOME_REQUEST = 'createIncomeRequest';
export const CREATE_INCOME_SUCCESS = 'createIncomeSuccess';
export const CREATE_INCOME_ERROR = 'createIncomeError';

export const GET_ACCOUNT_INCOMES_REQUEST = 'getAccountIncomesRequest';
export const GET_ACCOUNT_INCOMES_SUCCESS = 'getAccountIncomesSuccess';
export const GET_ACCOUNT_INCOMES_ERROR = 'getAccountIncomesError';

export const GET_INCOME_REQUEST = 'getIncomeRequest';
export const GET_INCOME_SUCCESS = 'getIncomeSuccess';
export const GET_INCOME_ERROR = 'getIncomeError';

export const DELETE_INCOME_REQUEST = 'deleteIncomeRequest';
export const DELETE_INCOME_SUCCESS = 'deleteIncomeSuccess';
export const DELETE_INCOME_ERROR = 'deleteIncomeError';

export function createIncomeRequest() {
  return {
    type: CREATE_INCOME_REQUEST
  };
}

export function createIncomeSuccess(data) {
  return {
    type: CREATE_INCOME_SUCCESS,
    payload: data
  };
}

export function createIncomeError(error) {
  return {
    type: CREATE_INCOME_ERROR,
    payload: error
  };
}

export function createIncome(
  accountId,
  recurring,
  dayOfMonth,
  dayOfWeek,
  amount,
  description,
  month
) {
  return async (dispatch) => {
    try {
      dispatch(createIncomeRequest());
      const result = await doCreateIncomeRequest(
        accountId,
        recurring,
        dayOfMonth,
        dayOfWeek,
        amount,
        description,
        month
      );
      dispatch(createIncomeSuccess(result.data));
    } catch (e) {
      dispatch(createIncomeError(e));
    }
  };
}

export function getAccountIncomesRequest() {
  return {
    type: GET_ACCOUNT_INCOMES_REQUEST
  };
}

export function getAccountIncomesSuccess(data) {
  return {
    type: GET_ACCOUNT_INCOMES_SUCCESS,
    payload: data
  };
}

export function getAccountIncomesError(error) {
  return {
    type: GET_ACCOUNT_INCOMES_ERROR,
    payload: error
  };
}

export function getAccountIncomes(
  accountId,
) {
  return async (dispatch) => {
    try {
      dispatch(getAccountIncomesRequest());
      const result = await doGetAccountIncomesRequest(
        accountId,
      );
      dispatch(getAccountIncomesSuccess(result.data));
    } catch (e) {
      dispatch(getAccountIncomesError(e));
    }
  };
}

export function getIncomeRequest() {
  return {
    type: GET_INCOME_REQUEST
  };
}

export function getIncomeSuccess(data) {
  return {
    type: GET_INCOME_SUCCESS,
    payload: data
  };
}

export function getIncomeError(error) {
  return {
    type: GET_INCOME_ERROR,
    payload: error
  };
}

export function getIncome(
  accountId,
  incomeId
) {
  return async (dispatch) => {
    try {
      dispatch(getIncomeRequest());
      const result = await doGetIncomeRequest(
        accountId,
        incomeId,
      );
      dispatch(getIncomeSuccess(result.data));
    } catch (e) {
      dispatch(getIncomeError(e));
    }
  };
}

export function deleteIncomeRequest() {
  return {
    type: DELETE_INCOME_REQUEST
  };
}

export function deleteIncomeSuccess(data) {
  return {
    type: DELETE_INCOME_SUCCESS,
    payload: data
  };
}

export function deleteIncomeError(error) {
  return {
    type: DELETE_INCOME_ERROR,
    payload: error
  };
}

export function deleteIncome(
  accountId,
  incomeId
) {
  return async (dispatch) => {
    try {
      dispatch(deleteIncomeRequest());
      const result = await doDeleteIncomeRequest(
        accountId,
        incomeId,
      );
      dispatch(deleteIncomeSuccess(result.data));
    } catch (e) {
      dispatch(deleteIncomeError(e));
    }
  };
}