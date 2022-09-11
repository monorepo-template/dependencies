import { writeFileSync } from 'fs';
import type { CoverageMap } from 'istanbul-lib-coverage';
import makeDir from 'make-dir';
import { join } from 'path';
import getCoverageMap from './utils/get-coverage-map';

/*
Consider `bin/merge-coverage` being a monorepo-template coverage merging module,
  while moving `src/merge-coverage` to a more generic multi-directory coverage
  merging module.
*/

interface Options {
  readonly enableLogging?: boolean | undefined;
  readonly outputDirectory?: string | undefined;
  readonly outputFile?: string | undefined;
  readonly reporter?:
    | readonly (string | readonly [string, Readonly<Record<string, unknown>>])[]
    | undefined;
  readonly workingDirectory?: string | undefined;
}

const DEFAULT_OPTIONS: Options = {};
const SPACES_COUNT = 2;

export default async function mergeCoverage(
  paths: readonly string[],
  {
    enableLogging = true,
    outputDirectory = '.nyc_output',
    outputFile = 'out.json',
    reporter = ['clover', 'json', 'lcov', 'text'],
    workingDirectory = process.cwd(),
  }: Options = DEFAULT_OPTIONS,
): Promise<void> {
  const map: CoverageMap = await getCoverageMap({
    enableLogging,
    paths,
    reporter,
    workingDirectory,
  });

  const OUTPUT_DIR: string = join(workingDirectory, outputDirectory);
  await makeDir(OUTPUT_DIR);

  const OUTPUT_FILE: string = join(OUTPUT_DIR, outputFile);

  if (enableLogging) {
    console.log(`Writing coverage file: ${OUTPUT_FILE}`);
  }

  const mapStr: string = JSON.stringify(map, null, SPACES_COUNT);
  writeFileSync(OUTPUT_FILE, mapStr, 'utf8');
}
