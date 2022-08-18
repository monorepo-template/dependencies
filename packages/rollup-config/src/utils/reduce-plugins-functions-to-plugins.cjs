module.exports = function reducePluginsFunctionToPlugins(
  plugins,
  pluginsFunction,
) {
  return pluginsFunction(plugins);
};
