/// <reference types="jest" />
import mapPackageJsonToDependenciesRecord from './map-package-json-to-dependencies-record';

describe('mapPackageJsonToDependenciesRecord', () => {
  it('should return dependencies if they exist', () => {
    expect(
      mapPackageJsonToDependenciesRecord({
        dependencies: {
          react: '^16.8.0',
        },
      }),
    ).toEqual({
      react: '^16.8.0',
    });
  });

  it('should return an empty object if no dependencies exist', () => {
    expect(mapPackageJsonToDependenciesRecord({})).toEqual({});
  });
});
