import mergeCoverage from '@monorepo-template/merge-coverage';
import type { NYCThresholds } from 'nyc';
import NYC from 'nyc';
import DEFAULT_OUTPUT_DIRECTORY from './constants/default-output-directory';
import DEFAULT_TEMPORARY_DIRECTORY from './constants/default-temporary-directory';

interface Options {
  readonly enableLogging?: boolean | undefined;
  readonly outputDirectory?: string | undefined;
  readonly paths: readonly string[];
  readonly temporaryDirectory?: string | undefined;
  readonly thresholds?: NYCThresholds | undefined;
  readonly workingDirectory: string;
}

const DEFAULT_THRESHOLDS: NYCThresholds = {
  branches: 100,
  functions: 100,
  lines: 100,
  statements: 100,
};

export default async function coverage({
  enableLogging,
  outputDirectory = DEFAULT_OUTPUT_DIRECTORY,
  paths,
  temporaryDirectory = DEFAULT_TEMPORARY_DIRECTORY,
  thresholds = DEFAULT_THRESHOLDS,
  workingDirectory,
}: Options): Promise<void> {
  await mergeCoverage(paths, {
    enableLogging,
    outputDirectory: temporaryDirectory,
    workingDirectory,
  });

  const nyc: NYC = new NYC({
    cwd: workingDirectory,
    reportDir: outputDirectory,
    reporter: ['clover', 'json', 'lcov', 'text'],
    skipEmpty: true,
    skipFull: false,
    tempDirectory: temporaryDirectory,
  });

  await nyc.report();

  await nyc.checkCoverage(thresholds, false);
}
