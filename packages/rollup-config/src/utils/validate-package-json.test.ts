/// <reference types="jest" />
import validatePackageJson from './validate-package-json';

describe('validatePackageJson', (): void => {
  it('should throw an error when passed a non-record', (): void => {
    expect((): void => {
      validatePackageJson('');
    }).toThrowError('Expected `package.json` to be a record.');
  });

  it('should throw an error when `dependencies` is a non-record', (): void => {
    expect((): void => {
      validatePackageJson({
        dependencies: '',
      });
    }).toThrowError(
      "Expected `package.json`'s `dependencies` to be a record of strings.",
    );
  });

  it('should throw an error when `peerDependencies` is a non-record', (): void => {
    expect((): void => {
      validatePackageJson({
        peerDependencies: '',
      });
    }).toThrowError(
      "Expected `package.json`'s `peerDependencies` to be a record of strings.",
    );
  });
});
