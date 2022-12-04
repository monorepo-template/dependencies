import mapModuleNameMapperToPatterns from './map-module-name-mapper-to-patterns';

describe('mapModuleNameMapperToPatterns', (): void => {
  it('should return no patterns if there is no moduleNameMapper', (): void => {
    expect(mapModuleNameMapperToPatterns(undefined)).toStrictEqual([]);
  });
});
