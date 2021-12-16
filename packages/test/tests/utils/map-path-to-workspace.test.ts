import mapPathToWorkspace from './map-path-to-workspace';

describe('mapPathToWorkspace', (): void => {
  it.skip('should match workspace paths that start with other workspace paths', (): void => {
    // Given two workspaces, `packages/test` and `packages/test-alpha`,
    expect(mapPathToWorkspace('packages/test-alpha/**/*')).toBe(
      'packages/test-alpha',
    );
  });

  it('should return undefined for non-workspace paths', (): void => {
    expect(mapPathToWorkspace('packages/xyz')).toBeUndefined();
  });
});
