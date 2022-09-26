import type PackageJson from '../types/package-json';
import filterByArray from './filter-by-array';
import filterByRecord from './filter-by-record';
import filterByString from './filter-by-string';

const filterByStringTuple = (value: unknown): value is [string, string] => {
  return filterByArray(value) && value.every(filterByString);
};

const filterByStringRecord = (
  value: unknown,
): value is Record<string, string> => {
  return (
    filterByRecord(value) && Object.entries(value).every(filterByStringTuple)
  );
};

export default function validatePackageJson(value: unknown): PackageJson {
  if (!filterByRecord(value)) {
    throw new Error('Expected `package.json` to be a record.');
  }

  const { dependencies, peerDependencies } = value;
  if (
    typeof dependencies !== 'undefined' &&
    !filterByStringRecord(dependencies)
  ) {
    throw new Error(
      "Expected `package.json`'s `dependencies` to be a record of strings.",
    );
  }

  if (
    typeof peerDependencies !== 'undefined' &&
    !filterByStringRecord(peerDependencies)
  ) {
    throw new Error(
      "Expected `package.json`'s `peerDependencies` to be a record of strings.",
    );
  }

  return {
    dependencies,
    peerDependencies,
  };
}
