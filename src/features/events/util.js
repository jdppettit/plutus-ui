import axios from 'axios';
import config from '../../config/app';

export const doGetEventsWindowRequest = async (
  accountId,
  windowStart,
  windowEnd
) => axios({
  method: 'GET',
  baseURL: config.BASE_PATH,
  url: `api/v1/account/${accountId}/event?window_start="${windowStart}"&window_end="${windowEnd}"`
})