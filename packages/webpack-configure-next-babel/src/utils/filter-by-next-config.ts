import filterByRecord from '../utils/filter-by-record';

interface NextConfig {
  readonly distDir: string;
}

export default function filterByNextConfig(
  value: unknown,
): value is NextConfig {
  return filterByRecord(value) && typeof value.distDir === 'string';
}
