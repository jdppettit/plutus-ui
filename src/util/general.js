import moment from 'moment';
import config from '../config/app'

export const formatDate = date => {
  return moment(date).format(config.DATE_FORMAT);
}

export const redirectTo = (href) => {
  window.location.assign(href);
}

export const accountTabSettings = {
  "1": {
    name: "match",
    show_date_picker: false
  },
  "2": {
    name: "transactions",
    show_date_picker: true
  },
  "3": {
    name: "incomes",
    show_date_picker: false
  },
  "4": {
    name: "events",
    show_date_picker: true
  },
  "5": {
    name: "account_settings",
    show_date_picker: false
  },
  "match": {
    tab_number: "1",
    show_date_picker: false
  },
  "transactions": {
    tab_number: "2",
    show_date_picker: true
  },
  "incomes": {
    tab_number: "3",
    show_date_picker: false
  },
  "events": {
    tab_number: "4",
    show_date_picker: true
  },
  "account_settings": {
    tab_number: "5",
    show_date_picker: false
  }
}