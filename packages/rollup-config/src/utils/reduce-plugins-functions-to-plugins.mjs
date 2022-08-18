export default function reducePluginsFunctionsToPlugins(
  plugins,
  pluginsFunction,
) {
  return pluginsFunction(plugins);
}
