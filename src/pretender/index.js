import Pretender from 'pretender';

// import featurePretender from '../features/authentication/pretender'
import checksPretender from '../features/checks/pretender';
import accountsPretender from '../features/accounts/pretender';

export const init = () => {
  const server = new Pretender(
    checksPretender,
    accountsPretender
  );

  server.handledRequest = function handledRequest(verb, path, request) {
    console.info(`[Pretender] ${verb} ${path}`, request);
  };
}

export default init;
