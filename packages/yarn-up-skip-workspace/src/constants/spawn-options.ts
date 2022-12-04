import type { SpawnOptions } from 'node:child_process';

const SPAWN_OPTIONS: SpawnOptions = {
  shell: true,
  stdio: 'pipe',
};

export default SPAWN_OPTIONS;
