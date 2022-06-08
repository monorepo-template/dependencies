module.exports = function getRelativeTSConfigPath() {
  const relativeTSConfigPathEnv = process.env.TSCONFIG_PATH;
  if (
    typeof relativeTSConfigPathEnv === 'string' &&
    relativeTSConfigPathEnv !== ''
  ) {
    return relativeTSConfigPathEnv;
  }
  return './cypress/tsconfig.json';
};
