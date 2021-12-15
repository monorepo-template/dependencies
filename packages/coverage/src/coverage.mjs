import mergeCoverage from '@monorepo-template/merge-coverage';
import NYC from 'nyc';

const DEFAULT_TEMP_DIRECTORY = '.nyc_output';

const DEFAULT_THRESHOLDS = {
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
}) {
  await mergeCoverage(paths, {
    outputDirectory: tempDirectory,
    workingDirectory,
  });

  const nyc = new NYC({
    cwd: workingDirectory,
    reporter: ['clover', 'json', 'lcov', 'text'],
    skipEmpty: true,
    skipFull: false,
    tempDirectory,
  });

  await nyc.report();

  await nyc.checkCoverage(thresholds, false);
}
