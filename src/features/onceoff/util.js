import axios from 'axios';
import config from '../../config/app';

export const doCreateOnceOffRequest = async (
  accountId
) => axios({
  method: 'POST',
  baseURL: config.BASE_PATH,
  url: `api/v1/account/${accountId}/once_off`,
  data: {}
})

export const doGetOnceOffsRequest = async (
  accountId,
) => axios({
  method: 'GET',
  baseURL: config.BASE_PATH,
  url: `api/v1/account/${accountId}/once_off`
})