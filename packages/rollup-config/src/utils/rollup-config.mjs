import typescript2 from 'rollup-plugin-typescript2';
import COMMONJS_PLUGIN from '../constants/commonjs-plugin.mjs';
import EXTERNAL_DEPENDENCIES_SET from '../constants/external-dependencies-set.mjs';
import IS_DEV from '../constants/is-dev.mjs';
import NO_JSX_RUNTIME_PLUGIN from '../constants/no-jsx-runtime-plugin.mjs';
import NODE_RESOLVE_PLUGIN from '../constants/node-resolve-plugin.mjs';
import WATCH from '../constants/watch.mjs';
import mapMapToRecord from './map-map-to-record.mjs';
import reducePluginsFunctionToPlugins from './reduce-plugins-functions-to-plugins.mjs';

const EMPTY = 0;

export default class RollupConfig {
  _cjsDirectory = './dist/cjs';

  _cjsExtension = 'cjs';

  _developmentMode = IS_DEV;

  _developmentTSConfigPath = './tsconfig.development.json';

  _esmDirectory = './dist/esm';

  _esmExtension = 'js';

  _externalDependencies = EXTERNAL_DEPENDENCIES_SET;

  _fileName = '[name]';

  _input = new Map();

  _jsxRuntime = true;

  _pluginsFunctions = [];

  _tsconfigPath = './tsconfig.json';

  get cjsDirectory() {
    return this._cjsDirectory;
  }

  get cjsExtension() {
    return this._cjsExtension;
  }

  get developmentMode() {
    return this._developmentMode;
  }

  get developmentTSConfigPath() {
    return this._developmentTSConfigPath;
  }

  get esmDirectory() {
    return this._esmDirectory;
  }

  get esmExtension() {
    return this._esmExtension;
  }

  get externalDependencies() {
    return this._externalDependencies;
  }

  get fileName() {
    return this._fileName;
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

  get output() {
    return [this.outputCjs, this.outputEsm];
  }

  get outputCjs() {
    return {
      chunkFileNames: `${this.fileName}-[hash].${this.cjsExtension}`,
      dir: this.cjsDirectory,
      entryFileNames: `${this.fileName}.${this.cjsExtension}`,
      exports: 'named',
      format: 'cjs',
      sourcemap: this.developmentMode,
    };
  }

  get outputEsm() {
    return {
      chunkFileNames: `${this.fileName}-[hash].${this.esmExtension}`,
      dir: this.esmDirectory,
      entryFileNames: `${this.fileName}.${this.esmExtension}`,
      format: 'es',
      sourcemap: this.developmentMode,
    };
  }

  get plugins() {
    const plugins = [COMMONJS_PLUGIN, NODE_RESOLVE_PLUGIN];

    if (!this.jsxRuntime) {
      plugins.push(NO_JSX_RUNTIME_PLUGIN);
    }

    plugins.push(this.typeScriptPlugin);
    return this._pluginsFunctions.reduce(
      reducePluginsFunctionToPlugins,
      plugins,
    );
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
      clean: true,
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

  setCjsDirectory = cjsDirectory => {
    this._cjsDirectory = cjsDirectory;
    return this;
  };

  setDevelopmentTSConfigPath = developmentTSConfigPath => {
    this._developmentTSConfigPath = developmentTSConfigPath;
    return this;
  };

  setEsmDirectory = esmDirectory => {
    this._esmDirectory = esmDirectory;
    return this;
  };

  setFileName = fileName => {
    this._fileName = fileName;
    return this;
  };

  setPlugins = f => {
    this._pluginsFunctions.push(f);
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
    output: this.output,
    plugins: this.plugins,
    treeshake: !this.developmentMode,
    watch: WATCH,
  });
}
