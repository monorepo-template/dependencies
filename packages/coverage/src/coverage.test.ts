import { existsSync, rmSync } from 'fs';
import { join } from 'path';
import coverage from '.';
import DEFAULT_OUTPUT_DIRECTORY from './constants/default-output-directory';
import DEFAULT_TEMPORARY_DIRECTORY from './constants/default-temporary-directory';

const CWD: string = process.cwd();
const ABSOLUTE_OUTPUT_PATH: string = join(CWD, DEFAULT_OUTPUT_DIRECTORY);
const ABSOLUTE_TEMPORARY_PATH: string = join(CWD, DEFAULT_TEMPORARY_DIRECTORY);
const ABSOLUTE_TEMPORARY_FILE_PATH: string = join(
  ABSOLUTE_TEMPORARY_PATH,
  'out.json',
);

describe('coverage', (): void => {
  afterEach((): void => {
    rmSync(ABSOLUTE_OUTPUT_PATH, {
      force: true,
      recursive: true,
    });
    rmSync(ABSOLUTE_TEMPORARY_PATH, {
      force: true,
      recursive: true,
    });
  });

  it('should write a NYC output file', async (): Promise<void> => {
    await coverage({
      enableLogging: false,
      paths: [],
      workingDirectory: '.',
    });

    const outputFilePathExists: boolean = existsSync(
      ABSOLUTE_TEMPORARY_FILE_PATH,
    );
    expect(outputFilePathExists).toBe(true);
  });
});
