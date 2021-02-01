import moment from 'moment';
import timezone from 'moment-timezone';
import config from '../config/app'

export const formatDate = date => {
  return moment(date).format(config.DATE_FORMAT);
}
