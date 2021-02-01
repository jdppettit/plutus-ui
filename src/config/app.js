import getCurrentEnvironment from '../util/environment';
let config = {}

if(getCurrentEnvironment() === 'development') {
  config = {
    BASE_PATH: '/',
    DATE_FORMAT: 'll'
  }
} else {
  config = {
    BASE_PATH: 'http://localhost:4040',
    DATE_FORMAT: 'll'
  }
}

export default config;
