import Pretender from 'pretender';

// import featurePretender from '../features/authentication/pretender'
import accountsPretender from '../features/accounts/pretender';
import incomePretender from '../features/income/pretender';

export const init = () => {
  const server = new Pretender(
    accountsPretender,
    incomePretender
  );

  server.handledRequest = function handledRequest(verb, path, request) {
    console.info(`[Pretender] ${verb} ${path}`, request);
  };
}

export default init;
