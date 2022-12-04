/// <reference types="jest" />
import JEST_PRESET from '.';
import mapModuleNameMapperToPatterns from './test/utils/map-module-name-mapper-to-patterns';

const { moduleNameMapper } = JEST_PRESET;

describe('JEST_PRESET', (): void => {
  describe('moduleNameMapper', (): void => {
    const PATTERNS: readonly RegExp[] =
      mapModuleNameMapperToPatterns(moduleNameMapper);

    const expectToMatchPath = (path: string): void => {
      const matchPath = (regexp: Readonly<RegExp>): boolean =>
        regexp.test(path);
      const didMatch: boolean = PATTERNS.some(matchPath);
      expect(didMatch).toBe(true);
    };

    it('should support CSS files', (): void => {
      expectToMatchPath('./src/features/app/app.css');
    });

    it('should support CSS modules', (): void => {
      expectToMatchPath('./src/components/button/button.module.css');
    });

    it('should support images', (): void => {
      expectToMatchPath('./src/assets/avatar.gif');
      expectToMatchPath('./src/assets/avatar.jpg');
      expectToMatchPath('./src/assets/avatar.jpeg');
      expectToMatchPath('./src/assets/avatar.png');
    });
  });
});
