import yarnUpSkipWorkspace from 'yarn-up-skip-workspace';
import SPAWN_OPTIONS from '../constants/spawn-options';
import spawnPromise from './spawn-promise';

export default async function up(): Promise<void> {
  await spawnPromise('yarn', ['set', 'version', 'latest'], SPAWN_OPTIONS);
  await spawnPromise('yarn', ['install'], SPAWN_OPTIONS);
  await spawnPromise('yarn', ['sdks', 'vscode'], SPAWN_OPTIONS);
  await yarnUpSkipWorkspace('"*"', '"@*/*"');
  await spawnPromise(
    'yarn',
    ['up', '--recursive', '"*"', '"@*/*"'],
    SPAWN_OPTIONS,
  );
}
