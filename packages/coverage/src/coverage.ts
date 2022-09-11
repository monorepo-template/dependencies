import mergeCoverage from '@monorepo-template/merge-coverage';
import type { NYCThresholds } from 'nyc';
import NYC from 'nyc';

interface Options {
  readonly paths: readonly string[];
  readonly tempDirectory?: string | undefined;
  readonly thresholds?: NYCThresholds | undefined;
  readonly workingDirectory: string;
}

const DEFAULT_TEMP_DIRECTORY = '.nyc_output';

const DEFAULT_THRESHOLDS: NYCThresholds = {
  branches: 100,
  functions: 100,
  lines: 100,
  statements: 100,
};

export default async function coverage({
  paths,
  tempDirectory = DEFAULT_TEMP_DIRECTORY,
  thresholds = DEFAULT_THRESHOLDS,
  workingDirectory,
}: Options): Promise<void> {
  await mergeCoverage(paths, {
    outputDirectory: tempDirectory,
    workingDirectory,
  });

  const nyc: NYC = new NYC({
    cwd: workingDirectory,
    reporter: ['clover', 'json', 'lcov', 'text'],
    skipEmpty: true,
    skipFull: false,
    tempDirectory,
  });

  await nyc.report();

  await nyc.checkCoverage(thresholds, false);
}
