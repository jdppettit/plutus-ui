import axios from 'axios';
import config from '../../config/app';

export const doGetAccountTransactionsRequest = async (
  accountId
) => axios({
  method: 'GET',
  baseURL: config.BASE_PATH,
  url: `api/v1/account/${accountId}/transaction`
})

export const doGetTransactionsWindowRequest = async (
  accountId,
  windowStart,
  windowEnd
) => axios({
  method: 'GET',
  baseURL: config.BASE_PATH,
  url: `api/v1/account/${accountId}/transaction/window?window_start="${windowStart}"&window_end="${windowEnd}"`
})