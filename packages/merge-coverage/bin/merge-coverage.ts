import mapRelativePathToAbsolutePath from './utils/map-relative-path-to-absolute-path';
import mergeCoverage from '../src/index';

const COMMAND_PREFIX_LENGTH = 2;

const relativePaths = process.argv.slice(COMMAND_PREFIX_LENGTH);
const absolutePaths = relativePaths.map(mapRelativePathToAbsolutePath);

await mergeCoverage(absolutePaths, {
  workingDirectory: process.cwd(),
});
