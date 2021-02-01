const getCurrentEnvironment = () => {
  const env = process.env.NODE_ENV;

  return env;
}

export default getCurrentEnvironment;
