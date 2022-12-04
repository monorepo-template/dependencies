import { spawn } from 'node:child_process';
import filterOptionsByAcceptable from './filter-options-by-acceptable.js';
import handleStdErrData from './handle-stderr-data.js';

const ARRAY_INDEX_OFFSET = 1;
const KEYPRESS_DOWN = '\u001b[B';
const KEYPRESS_ENTER = '\u000d';

export default async function yarnUpSkipWorkspace(...args) {
  return new Promise((resolve, reject) => {
    const child = spawn('yarn', ['up', '--interactive', ...args], {
      shell: true,
      stdio: 'pipe',
    });

    const handleStdOutData = chunk => {
      const chunkStr = chunk.toString();
      const options = chunkStr.split('\n');

      // If any option's selected state is acceptable, accept it.
      if (options.some(filterOptionsByAcceptable)) {
        process.stdout.write(chunkStr);
        child.stdin.write(KEYPRESS_ENTER);
        return;
      }

      // If the last option is to use the latest version, navigate towards it.
      const lastOptionIndex = options.length - ARRAY_INDEX_OFFSET;
      if (options[lastOptionIndex].startsWith('  Use ')) {
        child.stdin.write(KEYPRESS_DOWN);
        return;
      }

      process.stdout.write(chunkStr);
    };

    child.stderr.on('data', handleStdErrData);
    child.stdout.on('data', handleStdOutData);
    child.on('close', resolve);
    child.on('error', reject);
  });
}
