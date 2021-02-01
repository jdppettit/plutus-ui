import Pretender from 'pretender';

// import featurePretender from '../features/authentication/pretender'
import checksPretender from '../features/checks/pretender';

export const init = () => {
  const server = new Pretender(
    checksPretender,
  );

  server.handledRequest = function handledRequest(verb, path, request) {
    console.info(`[Pretender] ${verb} ${path}`, request);
  };
}

export default init;
