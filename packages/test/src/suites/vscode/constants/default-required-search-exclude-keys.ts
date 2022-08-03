const DEFAULT_REQUIRED_SEARCH_EXCLUDE_KEYS: readonly string[] = [
  '**/.pnp.*',
  '**/.yarn',
  '.git/',
  'packages/*/.nyc_output/',
  'packages/*/build/',
  'packages/*/coverage/',
  'packages/*/cypress/coverage/',
  'packages/*/cypress/screenshots/',
  'packages/*/cypress/videos/',
  'packages/*/dist/',
  'packages/*/jest/',
  'packages/*/node_modules/',
];

export default DEFAULT_REQUIRED_SEARCH_EXCLUDE_KEYS;
