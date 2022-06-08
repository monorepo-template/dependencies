module.exports = function getRelativeTSConfigPath() {
  const envPath = process.env.CYPRESS_TSCONFIG_PATH;
  if (typeof envPath === 'string' && envPath !== '') {
    return envPath;
  }
  return './cypress/tsconfig.json';
};
