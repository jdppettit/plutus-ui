import axios from 'axios';
import config from '../../config/app';

export const doCreateIncomeRequest = async (
  accountId,
  recurring,
  dayOfMonth,
  dayOfWeek,
  amount,
  description,
  month
) => axios({
  method: 'POST',
  baseURL: config.BASE_PATH,
  url: `api/v1/account/${accountId}/income`,
  data: {
    account_id: accountId,
    day_of_month: dayOfMonth,
    day_of_week: dayOfWeek,
    recurring,
    amount,
    description,
    month
  }
})

export const doGetAccountIncomesRequest = async (
  accountId
) => axios({
  method: 'GET',
  baseURL: config.BASE_PATH,
  url: `api/v1/account/${accountId}/income`
})

export const doGetIncomeRequest = async (
  accountId,
  incomeId
) => axios({
  method: 'GET',
  baseURL: config.BASE_PATH,
  url: `api/v1/account/${accountId}/income/${incomeId}`
})

export const doDeleteIncomeRequest = async (
  accountId,
  incomeId
) => axios({
  method: 'DELETE',
  baseURL: config.BASE_PATH,
  url: `api/v1/account/${accountId}/income/${incomeId}`
})