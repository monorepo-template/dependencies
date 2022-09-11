import { cpus } from 'os';

interface PMapOptions {
  readonly concurrency: number;
}

const P_MAP_OPTIONS: PMapOptions = {
  concurrency: cpus().length,
};

export default P_MAP_OPTIONS;
