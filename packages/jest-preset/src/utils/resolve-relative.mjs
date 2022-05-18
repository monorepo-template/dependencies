import { resolve } from 'path';
import requireResolve from '../utils/require-resolve.mjs';

export default function resolveRelative(...paths) {
  return resolve(
    requireResolve('@monorepo-template/jest-preset'),
    '..',
    ...paths,
  );
}
