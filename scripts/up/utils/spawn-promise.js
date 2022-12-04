import { spawn } from 'child_process';

export default async function spawnPromise(command, args, options) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, options);
    child.on('close', resolve);
    child.on('error', reject);
  });
}
