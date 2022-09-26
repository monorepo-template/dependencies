import filterByArray from '../../utils/filter-by-array';

export default function validateArray<T>(value: unknown | readonly T[]): T[] {
  if (!filterByArray<T>(value)) {
    throw new Error('Expected an array.');
  }
  return value;
}
