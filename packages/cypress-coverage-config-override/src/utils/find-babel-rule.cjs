module.exports = function findBabelRule({ loader }) {
  return /babel-loader/.test(loader);
};
