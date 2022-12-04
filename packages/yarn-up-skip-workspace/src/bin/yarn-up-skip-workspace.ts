import yarnUpSkipWorkspace from 'yarn-up-skip-workspace';
const { argv } = process;

const ARGV_DEPENDENCIES_INDEX = 2;
const EMPTY = 0;

if (argv.length === EMPTY) {
  await yarnUpSkipWorkspace('"*"', '"@*/*"');
} else {
  await yarnUpSkipWorkspace(...argv.slice(ARGV_DEPENDENCIES_INDEX));
}
