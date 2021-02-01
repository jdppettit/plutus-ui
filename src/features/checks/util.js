import axios from 'axios';
import config from '../../config/app';

export const allChecksRequest = async () => axios({
  method: 'GET',
  baseURL: config.BASE_PATH,
  url: 'api/v1/checks'
});
