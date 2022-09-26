/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import type { OutputOptions } from 'rollup';

export default function findEsmOutputOptions({
  format,
}: Readonly<OutputOptions>): boolean {
  return format === 'es';
}
