import type { OutputOptions, Plugin, RollupOptions } from 'rollup';
import NO_JSX_RUNTIME_PLUGIN from '../constants/no-jsx-runtime-plugin';
import findCjsOutputOptions from '../test/utils/find-cjs-output-options';
import findEsmOutputOptions from '../test/utils/find-esm-output-options';
import validateArray from '../test/utils/validate-array';
import validateDefined from '../test/utils/validate-defined';
import validateFunction from '../test/utils/validate-function';
import RollupConfig from './rollup-config';

const TEST_PLUGIN: Plugin = {
  name: 'test-plugin',
};

describe('RollupConfig', (): void => {
  describe('addExternalDependency', (): void => {
    it('should identify external dependencies', (): void => {
      const { external }: RollupOptions = new RollupConfig()
        .addExternalDependency('react')
        .toJSON();
      const externalFunction = validateFunction<
        [string, string | undefined, boolean],
        boolean | null
      >(external);
      expect(externalFunction('react', undefined, false)).toBe(true);
    });
  });

  describe('addInput', (): void => {
    it('should add an input', (): void => {
      expect(
        new RollupConfig().addInput('test', 'test/path.js').toJSON().input,
      ).toEqual({
        test: 'test/path.js',
      });
    });

    it('should inputs', (): void => {
      expect(
        new RollupConfig()
          .addInput('one', 'test/1.js')
          .addInput('two', 'test/2.js')
          .toJSON().input,
      ).toEqual({
        one: 'test/1.js',
        two: 'test/2.js',
      });
    });
  });

  describe('disableDevelopmentMode', (): void => {
    it('should enable tree shaking', (): void => {
      expect(
        new RollupConfig().disableDevelopmentMode().toJSON().treeshake,
      ).toBe(true);
    });
  });

  describe('disableJsxRuntime', (): void => {
    it('add the no-jsx-runtime plugin', (): void => {
      expect(new RollupConfig().disableJsxRuntime().toJSON().plugins).toContain(
        NO_JSX_RUNTIME_PLUGIN,
      );
    });
  });

  describe('enableDevelopmentMode', (): void => {
    it('should disable tree shaking', (): void => {
      expect(
        new RollupConfig().enableDevelopmentMode().toJSON().treeshake,
      ).toBe(false);
    });
  });

  describe('enableJsxRuntime', (): void => {
    it('not add the no-jsx-runtime plugin', (): void => {
      expect(
        new RollupConfig().enableJsxRuntime().toJSON().plugins,
      ).not.toContain(NO_JSX_RUNTIME_PLUGIN);
    });
  });

  describe('removeExternalDependency', (): void => {
    it('should unidentify external dependencies', (): void => {
      const { external }: RollupOptions = new RollupConfig()
        .addExternalDependency('react')
        .removeExternalDependency('react')
        .toJSON();
      const externalFunction = validateFunction<
        [string, string | undefined, boolean],
        boolean | null
      >(external);
      expect(externalFunction('react', undefined, false)).toBe(false);
    });
  });

  describe('removeInput', (): void => {
    it('should remove an input', (): void => {
      expect(
        new RollupConfig()
          .addInput('one', 'test/1.js')
          .addInput('two', 'test/2.js')
          .removeInput('one')
          .toJSON().input,
      ).not.toHaveProperty('one');
    });
  });

  describe('setCjsDirectory', (): void => {
    it('should disable CJS', (): void => {
      const { output } = new RollupConfig().setCjsDirectory(null).toJSON();

      const outputOptions: readonly OutputOptions[] = validateArray(output);
      const cjsOutputOptions: OutputOptions | undefined =
        outputOptions.find(findCjsOutputOptions);

      expect(cjsOutputOptions).toBeUndefined();
    });

    it('should set the CJS directory', (): void => {
      const { output } = new RollupConfig()
        .setCjsDirectory('./dist/custom')
        .toJSON();

      const outputOptions: readonly OutputOptions[] = validateArray(output);
      const { dir }: OutputOptions = validateDefined(
        outputOptions.find(findCjsOutputOptions),
      );
      expect(dir).toBe('./dist/custom');
    });
  });

  describe('setCjsExtension', (): void => {
    it('should set the CJS extension', (): void => {
      const { output } = new RollupConfig().setCjsExtension('test').toJSON();

      const outputOptions: readonly OutputOptions[] = validateArray(output);
      const { chunkFileNames, entryFileNames }: OutputOptions = validateDefined(
        outputOptions.find(findCjsOutputOptions),
      );

      expect(chunkFileNames).toMatch(/\.test$/);
      expect(entryFileNames).toMatch(/\.test$/);
    });
  });

  describe('setDevelopmentTSConfigPath', (): void => {
    it('should set the development TSConfig path', (): void => {
      const { developmentTSConfigPath } =
        new RollupConfig().setDevelopmentTSConfigPath('./test.json');
      expect(developmentTSConfigPath).toBe('./test.json');
    });
  });

  describe('setEsmDirectory', (): void => {
    it('should disable ESM', (): void => {
      const { output } = new RollupConfig().setEsmDirectory(null).toJSON();

      const outputOptions: readonly OutputOptions[] = validateArray(output);
      const esmOutputOptions: OutputOptions | undefined =
        outputOptions.find(findEsmOutputOptions);
      expect(esmOutputOptions).toBeUndefined();
    });

    it('should set the ESM directory', (): void => {
      const { output } = new RollupConfig()
        .setEsmDirectory('./dist/custom')
        .toJSON();

      const outputOptions: readonly OutputOptions[] = validateArray(output);
      const { dir }: OutputOptions = validateDefined(
        outputOptions.find(findEsmOutputOptions),
      );
      expect(dir).toBe('./dist/custom');
    });
  });

  describe('setEsmExtension', (): void => {
    it('should set the ESM extension', (): void => {
      const { output } = new RollupConfig().setEsmExtension('test').toJSON();

      const outputOptions: readonly OutputOptions[] = validateArray(output);
      const { chunkFileNames, entryFileNames }: OutputOptions = validateDefined(
        outputOptions.find(findEsmOutputOptions),
      );
      expect(chunkFileNames).toMatch(/\.test$/);
      expect(entryFileNames).toMatch(/\.test$/);
    });
  });

  describe('setFileName', (): void => {
    it('should set the file name', (): void => {
      const { output } = new RollupConfig().setFileName('test').toJSON();
      const outputOptions: readonly OutputOptions[] = validateArray(output);
      for (const { chunkFileNames, entryFileNames } of outputOptions) {
        expect(chunkFileNames).toMatch(/^test-\[hash\]\./);
        expect(entryFileNames).toMatch(/^test\./);
      }
    });
  });

  describe('setPlugins', (): void => {
    it('should set plugins', (): void => {
      const { plugins } = new RollupConfig()
        .setPlugins((): Plugin[] => [TEST_PLUGIN])
        .toJSON();
      expect(plugins).toStrictEqual(TEST_PLUGIN);
    });
  });

  describe('setTSConfigPath', (): void => {
    it('should set the TSConfig path', (): void => {
      const { tsconfigPath } = new RollupConfig().setTSConfigPath(
        './test.json',
      );
      expect(tsconfigPath).toBe('./test.json');
    });
  });

  describe('tsconfig', (): void => {
    it('should return the development TSConfig if development mode is enabled', (): void => {
      const { tsconfig }: RollupConfig = new RollupConfig()
        .enableDevelopmentMode()
        .setDevelopmentTSConfigPath('./test-development-tsconfig.json')
        .setTSConfigPath('./test-tsconfig.json');
      expect(tsconfig).toBe('./test-development-tsconfig.json');
    });

    it('should return the regular TSConfig if development mode is disabled', (): void => {
      const { tsconfig }: RollupConfig = new RollupConfig()
        .disableDevelopmentMode()
        .setDevelopmentTSConfigPath('./test-development-tsconfig.json')
        .setTSConfigPath('./test-tsconfig.json');
      expect(tsconfig).toBe('./test-tsconfig.json');
    });
  });
});
