const NO_JSX_RUNTIME_PLUGIN = require('../constants/no-jsx-runtime-plugin.cjs');
const RollupConfig = require('./rollup-config.cjs');

describe('RollupConfig', () => {
  describe('addExternalDependency', () => {
    it('should identify external dependencies', () => {
      expect(
        new RollupConfig()
          .addExternalDependency('react')
          .toJSON()
          .external('react'),
      ).toBe(true);
    });
  });

  describe('addInput', () => {
    it('should add an input', () => {
      expect(
        new RollupConfig().addInput('test', 'test/path.js').toJSON().input,
      ).toEqual({
        test: 'test/path.js',
      });
    });

    it('should inputs', () => {
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

  describe('disableDevelopmentMode', () => {
    it('should enable tree shaking', () => {
      expect(
        new RollupConfig().disableDevelopmentMode().toJSON().treeshake,
      ).toBe(true);
    });
  });

  describe('disableJsxRuntime', () => {
    it('add the no-jsx-runtime plugin', () => {
      expect(new RollupConfig().disableJsxRuntime().toJSON().plugins).toContain(
        NO_JSX_RUNTIME_PLUGIN,
      );
    });
  });

  describe('enableDevelopmentMode', () => {
    it('should disable tree shaking', () => {
      expect(
        new RollupConfig().enableDevelopmentMode().toJSON().treeshake,
      ).toBe(false);
    });
  });

  describe('enableJsxRuntime', () => {
    it('not add the no-jsx-runtime plugin', () => {
      expect(
        new RollupConfig().enableJsxRuntime().toJSON().plugins,
      ).not.toContain(NO_JSX_RUNTIME_PLUGIN);
    });
  });

  describe('external', () => {
    it('should identify external dependency subpaths', () => {
      expect(
        new RollupConfig()
          .addExternalDependency('react')
          .toJSON()
          .external('react/jsx-runtime'),
      ).toBe(true);
    });
  });

  describe('removeExternalDependency', () => {
    it('should unidentify external dependencies', () => {
      expect(
        new RollupConfig()
          .addExternalDependency('react')
          .removeExternalDependency('react')
          .toJSON()
          .external('react'),
      ).toBe(false);
    });
  });

  describe('removeInput', () => {
    it('should remove an input', () => {
      expect(
        new RollupConfig()
          .addInput('one', 'test/1.js')
          .addInput('two', 'test/2.js')
          .removeInput('one')
          .toJSON().input,
      ).not.toHaveProperty('one');
    });
  });

  describe('setCjsDirectory', () => {
    it('should set the CJS directory', () => {
      const { output } = new RollupConfig()
        .setCjsDirectory('./dist/custom')
        .toJSON();
      for (const { dir, format } of output) {
        if (format !== 'cjs') {
          continue;
        }
        expect(dir).toBe('./dist/custom');
      }
    });
  });

  describe('setDevelopmentTSConfigPath', () => {
    it('should set the development TSConfig path', () => {
      expect(
        new RollupConfig().setDevelopmentTSConfigPath('test.json')
          .developmentTSConfigPath,
      ).toBe('test.json');
    });
  });

  describe('setEsmDirectory', () => {
    it('should set the CJS directory', () => {
      const { output } = new RollupConfig()
        .setEsmDirectory('./dist/custom')
        .toJSON();
      for (const { dir, format } of output) {
        if (format !== 'es') {
          continue;
        }
        expect(dir).toBe('./dist/custom');
      }
    });
  });

  describe('setFileName', () => {
    it('should set the file name', () => {
      const { output } = new RollupConfig().setFileName('test').toJSON();
      for (const { chunkFileNames, entryFileNames } of output) {
        expect(chunkFileNames).toMatch(/^test-\[hash\]\./);
        expect(entryFileNames).toMatch(/^test\./);
      }
    });
  });

  describe('setTSConfigPath', () => {
    it('should set the TSConfig path', () => {
      expect(new RollupConfig().setTSConfigPath('test.json').tsconfigPath).toBe(
        'test.json',
      );
    });
  });

  describe('tsconfig', () => {
    const rollupConfig = new RollupConfig();

    beforeEach(() => {
      rollupConfig
        .disableDevelopmentMode()
        .setDevelopmentTSConfigPath('./tsconfig.development.json')
        .setTSConfigPath('./tsconfig.json');
    });

    it('should return the development TSConfig if development mode is enabled', () => {
      rollupConfig
        .enableDevelopmentMode()
        .setDevelopmentTSConfigPath('test.json');
      expect(rollupConfig.tsconfig).toBe('test.json');
    });

    it('should return the regular TSConfig if development mode is disabled', () => {
      rollupConfig.disableDevelopmentMode().setTSConfigPath('test.json');
      expect(rollupConfig.tsconfig).toBe('test.json');
    });
  });
});
