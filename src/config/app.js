import getCurrentEnvironment from '../util/environment';
let config = {}

if(getCurrentEnvironment() === 'development') {
  config = {
    BASE_PATH: '/',
    DATE_FORMAT: 'll'
  }
} else {
  config = {
    BASE_PATH: process.env.REACT_APP_PLUTUS_API_URL || 'http://localhost:4000',
    DATE_FORMAT: 'll'
  }
}

export default config;
