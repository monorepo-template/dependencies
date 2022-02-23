import typescript2 from 'rollup-plugin-typescript2';
import COMMONJS_PLUGIN from '../constants/commonjs-plugin.mjs';
import IS_DEV from '../constants/is-dev.mjs';
import NO_JSX_RUNTIME_PLUGIN from '../constants/no-jsx-runtime-plugin.mjs';
import NODE_RESOLVE_PLUGIN from '../constants/node-resolve-plugin.mjs';
import OUTPUT from '../constants/output.mjs';
import TSCONFIG from '../constants/tsconfig.mjs';
import WATCH from '../constants/watch.mjs';
import external from '../utils/external.mjs';
import mapMapToRecord from '../utils/map-map-to-record.mjs';

const EMPTY = 0;

export default class RollupConfig {
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
}
