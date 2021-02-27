import moment from 'moment';
import config from '../config/app'

export const formatDate = date => {
  return moment(date).format(config.DATE_FORMAT);
}

export const redirectTo = (href) => {
  window.location.assign(href);
}