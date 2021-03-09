import axios from 'axios';
import config from '../../config/app';

export const doGetEventsWindowRequest = async (
  accountId,
  windowStart,
  windowEnd
) => axios({
  method: 'GET',
  baseURL: config.BASE_PATH,
  url: `api/v1/account/${accountId}/event?window_start="${windowStart}"&window_end="${windowEnd}"&include_settled=true`
})

export const doUpdateEventRequest = async (
  accountId,
  eventId,
  description,
  amount,
  settled
) => axios({
  method: 'PUT',
  baseURL: config.BASE_PATH,
  url: `api/v1/account/${accountId}/event/${eventId}`,
  data: {
    description,
    amount,
    settled
  }
})

export const doCreateEventRequest = async (
  accountId,
  parentId,
  description,
  amount,
  type,
  autoSettle,
  anticipatedDate
) => axios({
  method: 'POST',
  baseURL: config.BASE_PATH,
  url: `api/v1/account/${accountId}/event`,
  data: {
    parent_id: parentId,
    description,
    amount,
    type,
    auto_settle: autoSettle,
    anticipated_date: anticipatedDate
  }
})

export const doUpdateEventAmountRequest = async (
  accountId,
  eventId,
  amount
) => axios({
  method: 'PUT',
  baseURL: config.BASE_PATH,
  url: `api/v1/account/${accountId}/event/${eventId}`,
  data: {
    amount
  }
})

export const doUpdateEventSettledRequest = async (
  accountId,
  eventId,
  settled
) => axios({
  method: 'PUT',
  baseURL: config.BASE_PATH,
  url: `api/v1/account/${accountId}/event/${eventId}`,
  data: {
    settled
  }
})

export const doDeleteEventRequest = async (
  accountId,
  eventId
) => axios({
  method: 'DELETE',
  baseURL: config.BASE_PATH,
  url: `api/v1/account/${accountId}/event/${eventId}`,
})