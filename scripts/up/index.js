import spawnPromise from './utils/spawn-promise.js';
import yarnUpWildcardSkipWorkspace from './utils/yarn-up-wildcard-skip-workspace.js';

const SPAWN_OPTIONS = {
  shell: true,
  stdio: 'inherit',
};

await spawnPromise('yarn', ['set', 'version', 'latest'], SPAWN_OPTIONS);
await spawnPromise('yarn', ['install'], SPAWN_OPTIONS);
await spawnPromise('yarn', ['sdks', 'vscode'], SPAWN_OPTIONS);
await yarnUpWildcardSkipWorkspace();
await spawnPromise(
  'yarn',
  ['up', '--recursive', '"*"', '"@*/*"'],
  SPAWN_OPTIONS,
);
