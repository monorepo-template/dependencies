import filterByFunction from './filter-by-function';

export default function validateFunction<
  A extends unknown[],
  R,
  T extends (...args: A) => R = (...args: A) => R,
>(value: T | unknown): T {
  if (!filterByFunction<A, R, T>(value)) {
    throw new Error('Expected a function.');
  }
  return value;
}
