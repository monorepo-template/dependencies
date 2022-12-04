import type { ChildProcess } from 'node:child_process';
import { spawn } from 'node:child_process';
import SPAWN_OPTIONS from '../constants/spawn-options';
import filterOptionsByAcceptable from './filter-options-by-acceptable';
import handleStdErrData from './handle-stderr-data';

const ARRAY_INDEX_OFFSET = 1;
const KEYPRESS_DOWN = '\u001b[B';
const KEYPRESS_ENTER = '\u000d';

const MISSING_STDERR_ERROR: Error = new Error(
  'Expected STDERR to exist, but received null.',
);

const MISSING_STDIN_ERROR: Error = new Error(
  'Expected STDIN to exist, but received null.',
);

const MISSING_STDOUT_ERROR: Error = new Error(
  'Expected STDOUT to exist, but received null.',
);

export default async function yarnUpSkipWorkspace(
  ...args: readonly string[]
): Promise<unknown> {
  return new Promise((resolve, reject): void => {
    const child: ChildProcess = spawn(
      'yarn',
      ['up', '--interactive', ...args],
      SPAWN_OPTIONS,
    );

    child.on('close', resolve);
    child.on('error', reject);

    if (child.stderr === null) {
      throw MISSING_STDERR_ERROR;
    }
    child.stderr.on('data', handleStdErrData);

    const write = (chunk: string): void => {
      if (child.stdin === null) {
        throw MISSING_STDIN_ERROR;
      }
      child.stdin.write(chunk);
    };

    const handleStdOutData = (chunk: Buffer | string): void => {
      const chunkStr: string = chunk.toString();
      const options: readonly string[] = chunkStr.split('\n');

      // If any option's selected state is acceptable, accept it.
      if (options.some(filterOptionsByAcceptable)) {
        process.stdout.write(chunkStr);
        write(KEYPRESS_ENTER);
        return;
      }

      // If the last option is to use the latest version, navigate towards it.
      const lastOptionIndex = options.length - ARRAY_INDEX_OFFSET;
      if (options[lastOptionIndex].startsWith('  Use ')) {
        write(KEYPRESS_DOWN);
        return;
      }

      process.stdout.write(chunkStr);
    };

    if (child.stdout === null) {
      throw MISSING_STDOUT_ERROR;
    }
    child.stdout.on('data', handleStdOutData);
  });
}
