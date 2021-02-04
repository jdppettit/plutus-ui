import axios from 'axios';
import config from '../../config/app';

export const linkTokenRequest = async () => axios({
  method: 'GET',
  baseURL: config.BASE_PATH,
  url: 'api/v1/account/linktoken'
});

export const publicTokenRequest = async (
  publicToken, description, accountName, remoteId, lastFour
) => axios({
  method: 'POST',
  baseURL: config.BASE_PATH,
  url: 'api/v1/account',
  data: {
    public_token: publicToken,
    description,
    account_name: accountName,
    remote_id: remoteId,
    last_four: lastFour
  }
})