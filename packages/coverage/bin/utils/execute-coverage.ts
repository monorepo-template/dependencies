import { existsSync } from 'fs';
import { join } from 'path';
import coverage from '../../src/index';
import MISSING_CYPRESS_COVERAGE_DIRECTORY_ERROR from '../constants/missing-cypress-coverage-directory-error';
import MISSING_JEST_COVERAGE_DIRECTORY_ERROR from '../constants/missing-jest-coverage-directory-error';
import THRESHOLDS from '../constants/thresholds';
import mapCypressCoverageDirectoryToPaths from './map-cypress-coverage-directory-to-paths';

export default async function executeCoverage(cwd: string): Promise<void> {
  const cypressCoverageDirectory: string = join(cwd, 'cypress', 'coverage');
  const jestCoverageDirectory: string = join(cwd, 'jest', 'coverage');

  if (!existsSync(cypressCoverageDirectory)) {
    throw MISSING_CYPRESS_COVERAGE_DIRECTORY_ERROR;
  }

  if (!existsSync(jestCoverageDirectory)) {
    throw MISSING_JEST_COVERAGE_DIRECTORY_ERROR;
  }

  const COVERAGE_PATHS: readonly string[] = [
    jestCoverageDirectory,
    ...mapCypressCoverageDirectoryToPaths(cypressCoverageDirectory),
  ];

  await coverage({
    paths: COVERAGE_PATHS,
    thresholds: THRESHOLDS,
    workingDirectory: cwd,
  });
}
