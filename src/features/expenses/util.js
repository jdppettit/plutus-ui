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

export const doCreateExpenseRequest = async (
  accountId,
  incomeId,
  amount,
  description
) => axios({
  method: 'POST',
  baseURL: config.BASE_PATH,
  url: `api/v1/account/${accountId}/income/${incomeId}/expense`,
  data: {
    account_id: accountId,
    income_id: incomeId,
    amount,
    description
  }
})