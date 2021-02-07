import axios from 'axios';
import config from '../../config/app';

export const doCreateIncomeRequest = async (
  accountId,
  recurring,
  dayOfMonth,
  dayOfWeek,
  amount,
  description
) => axios({
  method: 'POST',
  baseURL: config.BASE_PATH,
  url: `api/v1/account/${accountId}/income`,
  data: {
    account_id: accountId,
    recurring,
    day_of_month: dayOfMonth,
    day_of_week: dayOfWeek,
    amount,
    description
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