/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import type { OutputOptions } from 'rollup';

export default function findCjsOutputOptions({
  format,
}: Readonly<OutputOptions>): boolean {
  return format === 'cjs';
}
