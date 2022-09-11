#!/usr/bin/env node

import { existsSync } from 'fs';
import { join } from 'path';
import MISSING_CYPRESS_COVERAGE_DIRECTORY_ERROR from './constants/missing-cypress-coverage-directory-error';
import MISSING_JEST_COVERAGE_DIRECTORY_ERROR from './constants/missing-jest-coverage-directory-error';
import THRESHOLDS from './constants/thresholds';
import mapCypressCoverageDirectoryToPaths from './utils/map-cypress-coverage-directory-to-paths';
import coverage from '../src/index';

const CWD = process.cwd();
const CYPRESS_COVERAGE_DIRECTORY = join(CWD, 'cypress', 'coverage');
const JEST_COVERAGE_DIRECTORY = join(CWD, 'jest', 'coverage');

if (!existsSync(CYPRESS_COVERAGE_DIRECTORY)) {
  throw MISSING_CYPRESS_COVERAGE_DIRECTORY_ERROR;
}

if (!existsSync(JEST_COVERAGE_DIRECTORY)) {
  throw MISSING_JEST_COVERAGE_DIRECTORY_ERROR;
}

const COVERAGE_PATHS = [
  JEST_COVERAGE_DIRECTORY,
  ...mapCypressCoverageDirectoryToPaths(CYPRESS_COVERAGE_DIRECTORY),
];

await coverage({
  paths: COVERAGE_PATHS,
  thresholds: THRESHOLDS,
  workingDirectory: CWD,
});
