const path = require('path');

const nycConfigCjsPath = path.join(process.cwd(), 'nyc.config.cjs');

const getCommonJsNycConfig = () => {
  try {
    return require(nycConfigCjsPath);
  } catch (_err) {
    return;
  }
};

const COMMONJS_NYC_CONFIG = getCommonJsNycConfig();

module.exports = COMMONJS_NYC_CONFIG;
