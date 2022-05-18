import LOGGER from '../../constants/logger.mjs';
import mapSettingsJsonToSearchExclude from './utils/map-settings-json-to-search-exclude.mjs';

const BANNED_SEARCH_EXCLUDE_KEYS = ['**/.pnp.*', '**/.yarn'];

const REQUIRED_SEARCH_EXCLUDE_KEYS = [
  '.git',
  '.yarn',
  'packages/*/.nyc_output',
  'packages/*/build',
  'packages/*/coverage',
  'packages/*/cypress/coverage',
  'packages/*/cypress/screenshots',
  'packages/*/cypress/videos',
  'packages/*/dist',
  'packages/*/jest',
  'packages/*/node_modules',
  '.pnp.cjs',
  '.pnp.data.json',
  '.pnp.js',
  '.pnp.loader.mjs',
  '.yarn',
];

export default function testVSCodeSettingsSearchExclude(settingsJson) {
  LOGGER.addItem('search.exclude');

  if (!Object.prototype.hasOwnProperty.call(settingsJson, 'search.exclude')) {
    return;
  }

  LOGGER.indent();

  const searchExclude = mapSettingsJsonToSearchExclude(settingsJson);
  for (const bannedKey of BANNED_SEARCH_EXCLUDE_KEYS) {
    if (Object.prototype.hasOwnProperty.call(searchExclude, bannedKey)) {
      LOGGER.addError(new Error(`Remove \`${bannedKey}\`.`));
    }
  }

  for (const requiredKey of REQUIRED_SEARCH_EXCLUDE_KEYS) {
    if (!Object.prototype.hasOwnProperty.call(searchExclude, requiredKey)) {
      LOGGER.addError(new Error(`Add \`${requiredKey}\`.`));
      continue;
    }

    if (searchExclude[requiredKey] !== true) {
      LOGGER.addError(new Error(`Enable \`${requiredKey}\`.`));
    }
  }

  LOGGER.unindent();
}
