/// <reference types="jest" />
import getRelativeTSConfigPath from './get-relative-tsconfig-path';

const TEST_TSCONFIG_PATH = './tsconfig.test.json';

describe('getRelativeTSConfigPath', (): void => {
  describe('with a CYPRESS_TSCONFIG_PATH environment variable', (): void => {
    const previousTSConfigPathEnv: string | undefined =
      process.env.CYPRESS_TSCONFIG_PATH;

    afterEach((): void => {
      process.env.CYPRESS_TSCONFIG_PATH = previousTSConfigPathEnv;
    });

    it('should return the CYPRESS_TSCONFIG_PATH environment variable', (): void => {
      process.env.CYPRESS_TSCONFIG_PATH = TEST_TSCONFIG_PATH;
      expect(getRelativeTSConfigPath()).toBe(TEST_TSCONFIG_PATH);
    });

    it('should return the default TSConfig path if the CYPRESS_TSCONFIG_PATH environment variable is empty', (): void => {
      process.env.CYPRESS_TSCONFIG_PATH = '';
      expect(getRelativeTSConfigPath()).toBe('./cypress/tsconfig.json');
    });
  });
});
