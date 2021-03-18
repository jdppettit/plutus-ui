import axios from 'axios';
import config from '../../config/app';

export const doGetIncomeExpensesRequest = async (
  accountId,
  incomeId
) => axios({
  method: 'GET',
  baseURL: config.BASE_PATH,
  url: `api/v1/account/${accountId}/income/${incomeId}/expense`
})

export const doGetExpenseRequest = async (
  accountId,
  incomeId,
  expenseId
) => axios({
  method: 'GET',
  baseURL: config.BASE_PATH,
  url: `api/v1/account/${accountId}/income/${incomeId}/expense/${expenseId}`
})

export const doCreateExpenseRequest = async (
  accountId,
  incomeId,
  amount,
  description,
  transactionDescription,
  recurring,
  month
) => axios({
  method: 'POST',
  baseURL: config.BASE_PATH,
  url: `api/v1/account/${accountId}/income/${incomeId}/expense`,
  data: {
    account_id: accountId,
    income_id: incomeId,
    transaction_description: transactionDescription,
    amount,
    description,
    recurring,
    month
  }
})

export const doUpdateExpenseRequest = async (
  accountId,
  incomeId,
  expenseId,
  amount,
  description,
  transactionDescription,
  recurring,
  month
) => axios({
  method: 'PUT',
  baseURL: config.BASE_PATH,
  url: `api/v1/account/${accountId}/income/${incomeId}/expense/${expenseId}`,
  data: {
    account_id: accountId,
    income_id: incomeId,
    transaction_description: transactionDescription,
    amount,
    description,
    recurring,
    month
  }
})