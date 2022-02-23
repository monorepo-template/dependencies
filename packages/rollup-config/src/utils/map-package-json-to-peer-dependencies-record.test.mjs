import mapPackageJsonToPeerDependenciesRecord from './map-package-json-to-peer-dependencies-record.mjs';

describe('mapPackageJsonToPeerDependenciesRecord', () => {
  it('should return peer dependencies if they exist', () => {
    expect(
      mapPackageJsonToPeerDependenciesRecord({
        peerDependencies: {
          react: '^16.8.0',
        },
      }),
    ).toEqual({
      react: '^16.8.0',
    });
  });

  it('should return an empty object if no peer dependencies exist', () => {
    expect(mapPackageJsonToPeerDependenciesRecord({})).toEqual({});
  });
});
