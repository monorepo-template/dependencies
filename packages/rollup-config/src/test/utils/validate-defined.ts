import filterByDefined from './filter-by-defined';

export default function validateDefined<T>(value: T | undefined): T {
  if (!filterByDefined<T>(value)) {
    throw new Error('Expected value to be defined.');
  }
  return value;
}
