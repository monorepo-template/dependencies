import type { CoverageMap } from 'istanbul-lib-coverage';
import libCoverage from 'istanbul-lib-coverage';
import NYC from 'nyc';
import pMap from 'p-map';
import { join } from 'path';
import P_MAP_OPTIONS from '../constants/p-map-options';

/**
 * Instead of getting coverage from all coverage files in a base directory, we
 *   get coverage from all coverage files across multiple directories.
 * https://github.com/istanbuljs/nyc/blob/ab7c53b2f340b458789a746dff2abd3e2e4790c3/index.js#L420-444
 */

interface Options {
  readonly enableLogging: boolean;
  readonly paths: readonly string[];
  readonly reporter: readonly (
    | string
    | readonly [string, Readonly<Record<string, unknown>>]
  )[];
  readonly workingDirectory: string;
}

export default async function getCoverageMap({
  enableLogging,
  paths,
  reporter,
  workingDirectory,
}: Options): Promise<CoverageMap> {
  const map: CoverageMap = libCoverage.createCoverageMap({});

  const nyc: NYC = new NYC({
    cwd: workingDirectory,
    reporter,
    skipEmpty: true,
    skipFull: false,
  });

  for (const path of paths) {
    const handlePMap = async (file: string): Promise<void> => {
      try {
        const report: CoverageMap = await nyc.coverageFileLoad(file, path);
        map.merge(report);
        if (enableLogging) {
          console.log('Merged coverage file:', join(path, file));
        }
      } catch (err: unknown) {
        // `coverage-summary.json` is expected to throw a non-fatal error.
        if (enableLogging) {
          console.log('Failed to merge coverage file:', join(path, file), err);
        }
      }
    };

    const files: readonly string[] = await nyc.coverageFiles(path);
    await pMap(files, handlePMap, P_MAP_OPTIONS);
    map.data = await nyc.sourceMaps.remapCoverage(map.data);

    if (nyc.config.excludeAfterRemap) {
      const filterByShouldInstrument = (filename: string): boolean => {
        const shouldInstrument: boolean =
          nyc.exclude.shouldInstrument(filename);
        if (!shouldInstrument) {
          return false;
        }
        if (enableLogging) {
          console.log(
            `Excluding coverage file after remap: ${join(path, filename)}`,
          );
        }
        return true;
      };
      map.filter(filterByShouldInstrument);
    }
  }

  return map;
}
