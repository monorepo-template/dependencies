import { resolve } from 'path';
import requireResolve from './require-resolve';

export default function resolveRelative(...paths: readonly string[]): string {
  return resolve(
    requireResolve('@monorepo-template/jest-preset'),
    '..',
    '..',
    ...paths,
  );
}
