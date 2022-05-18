export default function mapSettingsJsonToSearchExclude(settingsJson) {
  if (!Object.prototype.hasOwnProperty.call(settingsJson, 'search.exclude')) {
    return Object.create(null);
  }
  return settingsJson['search.exclude'];
}
