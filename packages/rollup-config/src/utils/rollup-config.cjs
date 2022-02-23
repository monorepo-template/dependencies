const typescript2 = require('rollup-plugin-typescript2');
const COMMONJS_PLUGIN = require('../constants/commonjs-plugin.cjs');
const IS_DEV = require('../constants/is-dev.cjs');
const NO_JSX_RUNTIME_PLUGIN = require('../constants/no-jsx-runtime-plugin.cjs');
const NODE_RESOLVE_PLUGIN = require('../constants/node-resolve-plugin.cjs');
const OUTPUT = require('../constants/output.cjs');
const TSCONFIG = require('../constants/tsconfig.cjs');
const WATCH = require('../constants/watch.cjs');
const external = require('../utils/external.cjs');
const mapMapToRecord = require('../utils/map-map-to-record.cjs');

const EMPTY = 0;

module.exports = class RollupConfig {
  _developmentMode = IS_DEV;

  _input = new Map();

  _jsxRuntime = true;

  get developmentMode() {
    return this._developmentMode;
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

    if (!this._jsxRuntime) {
      plugins.push(NO_JSX_RUNTIME_PLUGIN);
    }

    plugins.push(this.typeScriptPlugin);
    return plugins;
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

  get typeScriptPlugin() {
    return typescript2({
      check: !this.developmentMode,
      tsconfig: TSCONFIG,
      tsconfigOverride: this.tsconfigOverride,
      useTsconfigDeclarationDir: true,
    });
  }

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

  removeInput = name => {
    this._input.delete(name);
    return this;
  };

  toJSON = () => ({
    cache: true,
    external,
    input: this.input,
    output: OUTPUT,
    plugins: this.plugins,
    treeshake: !this.developmentMode,
    watch: WATCH,
  });
};
