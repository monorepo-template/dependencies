module.exports = function filterPluginByTypeScript(plugin) {
  return (
    Object.prototype.hasOwnProperty.call(plugin, 'options') &&
    Object.prototype.hasOwnProperty.call(plugin, 'tsconfig') &&
    Object.prototype.hasOwnProperty.call(plugin.options, 'tsconfig')
  );
};
