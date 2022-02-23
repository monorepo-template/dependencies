const typescript2 = require('rollup-plugin-typescript2');
const COMMONJS_PLUGIN = require('../constants/commonjs-plugin.cjs');
const EXTERNAL_DEPENDENCIES_SET = require('../constants/external-dependencies-set.cjs');
const IS_DEV = require('../constants/is-dev.cjs');
const NO_JSX_RUNTIME_PLUGIN = require('../constants/no-jsx-runtime-plugin.cjs');
const NODE_RESOLVE_PLUGIN = require('../constants/node-resolve-plugin.cjs');
const OUTPUT = require('../constants/output.cjs');
const WATCH = require('../constants/watch.cjs');
const mapMapToRecord = require('../utils/map-map-to-record.cjs');

const EMPTY = 0;

module.exports = class RollupConfig {
  _developmentMode = IS_DEV;

  _developmentTSConfigPath = './tsconfig.development.json';

  _externalDependencies = EXTERNAL_DEPENDENCIES_SET;

  _input = new Map();

  _jsxRuntime = true;

  _tsconfigPath = './tsconfig.json';

  get developmentMode() {
    return this._developmentMode;
  }

  get developmentTSConfigPath() {
    return this._developmentTSConfigPath;
  }

  get externalDependencies() {
    return this._externalDependencies;
  }

  get hasInput() {
    return this._input.size > EMPTY;
  }

  get input() {
    if (this.hasInput) {
      return mapMapToRecord(this._input);
    }

    return 'src/index.ts';
  }

  get jsxRuntime() {
    return this._jsxRuntime;
  }

  get plugins() {
    const plugins = [COMMONJS_PLUGIN, NODE_RESOLVE_PLUGIN];

    if (!this.jsxRuntime) {
      plugins.push(NO_JSX_RUNTIME_PLUGIN);
    }

    plugins.push(this.typeScriptPlugin);
    return plugins;
  }

  get tsconfig() {
    if (this.developmentMode) {
      return this.developmentTSConfigPath;
    }
    return this.tsconfigPath;
  }

  get tsconfigOverride() {
    if (this.jsxRuntime) {
      return undefined;
    }

    return {
      compilerOptions: {
        jsx: 'react',
      },
    };
  }

  get tsconfigPath() {
    return this._tsconfigPath;
  }

  get typeScriptPlugin() {
    return typescript2({
      check: !this.developmentMode,
      tsconfig: this.tsconfig,
      tsconfigOverride: this.tsconfigOverride,
      useTsconfigDeclarationDir: true,
    });
  }

  addExternalDependency = dependency => {
    this.externalDependencies.add(dependency);
    return this;
  };

  addInput = (name, path) => {
    this._input.set(name, path);
    return this;
  };

  disableDevelopmentMode = () => {
    this._developmentMode = false;
    return this;
  };

  disableJsxRuntime = () => {
    this._jsxRuntime = false;
    return this;
  };

  enableDevelopmentMode = () => {
    this._developmentMode = true;
    return this;
  };

  enableJsxRuntime = () => {
    this._jsxRuntime = true;
    return this;
  };

  external = id => {
    if (this.externalDependencies.has(id)) {
      return true;
    }

    for (const pkg of this.externalDependencies) {
      if (id.startsWith(`${pkg}/`)) {
        return true;
      }
    }

    return false;
  };

  removeExternalDependency = dependency => {
    this.externalDependencies.delete(dependency);
    return this;
  };

  removeInput = name => {
    this._input.delete(name);
    return this;
  };

  setDevelopmentTSConfigPath = developmentTSConfigPath => {
    this._developmentTSConfigPath = developmentTSConfigPath;
    return this;
  };

  setTSConfigPath = tsconfigPath => {
    this._tsconfigPath = tsconfigPath;
    return this;
  };

  toJSON = () => ({
    cache: true,
    external: this.external,
    input: this.input,
    output: OUTPUT,
    plugins: this.plugins,
    treeshake: !this.developmentMode,
    watch: WATCH,
  });
};
