import yarnUpSkipWorkspace from './yarn-up-skip-workspace.js';

export default async function yarnUpWildcardSkipWorkspace() {
  await yarnUpSkipWorkspace('"*"', '"@*/*"');
}
