const DEFAULT_REQUIRED_SEARCH_EXCLUDE_KEYS: readonly string[] = [
  '.git',
  'packages/*/.nyc_output',
  'packages/*/build',
  'packages/*/coverage',
  'packages/*/cypress/coverage',
  'packages/*/cypress/screenshots',
  'packages/*/cypress/videos',
  'packages/*/dist',
  'packages/*/jest',
  'packages/*/node_modules',
  '**/.yarn',
  '**/.pnp.*',
];

export default DEFAULT_REQUIRED_SEARCH_EXCLUDE_KEYS;
