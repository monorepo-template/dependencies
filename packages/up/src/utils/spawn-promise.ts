import type { ChildProcess } from 'node:child_process';
import { spawn } from 'node:child_process';

export default async function spawnPromise(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  ...args: Parameters<typeof spawn>
): Promise<unknown> {
  return new Promise((resolve, reject): void => {
    const child: ChildProcess = spawn(...args);
    child.on('close', resolve);
    child.on('error', reject);
  });
}
