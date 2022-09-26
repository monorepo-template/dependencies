import type { OutputOptions, Plugin, RollupOptions } from 'rollup';
import typescript2 from 'rollup-plugin-typescript2';
import COMMONJS_PLUGIN from '../constants/commonjs-plugin';
import EXTERNAL_DEPENDENCIES_SET from '../constants/external-dependencies-set';
import IS_DEV from '../constants/is-dev';
import JSON_PLUGIN from '../constants/json-plugin';
import NO_JSX_RUNTIME_PLUGIN from '../constants/no-jsx-runtime-plugin';
import NODE_RESOLVE_PLUGIN from '../constants/node-resolve-plugin';
import WATCH from '../constants/watch';
import filterByNonNull from './filter-by-non-null';
import mapMapToRecord from './map-map-to-record';
import reducePluginsFunctionToPlugins from './reduce-plugins-functions-to-plugins';

const EMPTY = 0;

export default class RollupConfig {
  private _cjsDirectory: string | null = './dist/cjs';

  private _cjsExtension = 'cjs';

  private _developmentMode = IS_DEV;

  private _developmentTSConfigPath = './tsconfig.development.json';

  private _esmDirectory: string | null = './dist/esm';

  private _esmExtension = 'js';

  private readonly _externalDependencies: Set<string> =
    EXTERNAL_DEPENDENCIES_SET;

  private _fileName = '[name]';

  private readonly _input: Map<string, string> = new Map();

  private _jsxRuntime = true;

  private readonly _pluginsFunctions: ((
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    plugins: readonly Readonly<Plugin>[],
  ) => Plugin[])[] = [];

  private _tsconfigPath = './tsconfig.json';

  public get developmentTSConfigPath(): string {
    return this._developmentTSConfigPath;
  }

  public get tsconfig(): string {
    if (this.developmentMode) {
      return this.developmentTSConfigPath;
    }
    return this.tsconfigPath;
  }

  public get tsconfigPath(): string {
    return this._tsconfigPath;
  }

  private get cjsDirectory(): string | null {
    return this._cjsDirectory;
  }

  private get cjsExtension(): string {
    return this._cjsExtension;
  }

  private get developmentMode(): boolean {
    return this._developmentMode;
  }

  private get esmDirectory(): string | null {
    return this._esmDirectory;
  }

  private get esmExtension(): string {
    return this._esmExtension;
  }

  private get externalDependencies(): Set<string> {
    return this._externalDependencies;
  }

  private get fileName(): string {
    return this._fileName;
  }

  private get hasInput(): boolean {
    return this._input.size > EMPTY;
  }

  private get input(): Record<string, string> | string {
    if (this.hasInput) {
      return mapMapToRecord(this._input);
    }

    return 'src/index.ts';
  }

  private get jsxRuntime(): boolean {
    return this._jsxRuntime;
  }

  private get output(): OutputOptions[] {
    return [this.outputCjs, this.outputEsm].filter(filterByNonNull);
  }

  private get outputCjs(): OutputOptions | null {
    if (this.cjsDirectory === null) {
      return null;
    }

    return {
      chunkFileNames: `${this.fileName}-[hash].${this.cjsExtension}`,
      dir: this.cjsDirectory,
      entryFileNames: `${this.fileName}.${this.cjsExtension}`,
      exports: 'named',
      format: 'cjs',
      sourcemap: this.developmentMode,
    };
  }

  private get outputEsm(): OutputOptions | null {
    if (this.esmDirectory === null) {
      return null;
    }

    return {
      chunkFileNames: `${this.fileName}-[hash].${this.esmExtension}`,
      dir: this.esmDirectory,
      entryFileNames: `${this.fileName}.${this.esmExtension}`,
      format: 'es',
      sourcemap: this.developmentMode,
    };
  }

  private get plugins(): Plugin[] {
    const plugins: Plugin[] = [
      COMMONJS_PLUGIN,
      NODE_RESOLVE_PLUGIN,
      JSON_PLUGIN,
    ];

    if (!this.jsxRuntime) {
      plugins.push(NO_JSX_RUNTIME_PLUGIN);
    }

    plugins.push(this.typeScriptPlugin);

    return this._pluginsFunctions.reduce(
      reducePluginsFunctionToPlugins,
      plugins,
    );
  }

  private get tsconfigOverride(): Record<string, unknown> | undefined {
    if (this.jsxRuntime) {
      return;
    }

    return {
      compilerOptions: {
        jsx: 'react',
      },
    };
  }

  private get typeScriptPlugin(): Plugin {
    return typescript2({
      check: !this.developmentMode,
      clean: true,
      tsconfig: this.tsconfig,
      tsconfigOverride: this.tsconfigOverride,
      useTsconfigDeclarationDir: true,
    });
  }

  public addExternalDependency = (dependency: string): this => {
    this.externalDependencies.add(dependency);
    return this;
  };

  public addInput = (name: string, path: string): this => {
    this._input.set(name, path);
    return this;
  };

  public disableDevelopmentMode = (): this => {
    this._developmentMode = false;
    return this;
  };

  public disableJsxRuntime = (): this => {
    this._jsxRuntime = false;
    return this;
  };

  public enableDevelopmentMode = (): this => {
    this._developmentMode = true;
    return this;
  };

  public enableJsxRuntime = (): this => {
    this._jsxRuntime = true;
    return this;
  };

  public removeExternalDependency = (dependency: string): this => {
    this.externalDependencies.delete(dependency);
    return this;
  };

  public removeInput = (name: string): this => {
    this._input.delete(name);
    return this;
  };

  public setCjsDirectory = (cjsDirectory: string | null): this => {
    this._cjsDirectory = cjsDirectory;
    return this;
  };

  public setCjsExtension = (cjsExtension: string): this => {
    this._cjsExtension = cjsExtension;
    return this;
  };

  public setDevelopmentTSConfigPath = (
    developmentTSConfigPath: string,
  ): this => {
    this._developmentTSConfigPath = developmentTSConfigPath;
    return this;
  };

  public setEsmDirectory = (esmDirectory: string | null): this => {
    this._esmDirectory = esmDirectory;
    return this;
  };

  public setEsmExtension = (esmExtension: string): this => {
    this._esmExtension = esmExtension;
    return this;
  };

  public setFileName = (fileName: string): this => {
    this._fileName = fileName;
    return this;
  };

  public setPlugins = (
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    f: (plugins: readonly Readonly<Plugin>[]) => Plugin[],
  ): this => {
    this._pluginsFunctions.push(f);
    return this;
  };

  public setTSConfigPath = (tsconfigPath: string): this => {
    this._tsconfigPath = tsconfigPath;
    return this;
  };

  public toJSON = (): RollupOptions => ({
    external: this.external,
    input: this.input,
    output: this.output,
    plugins: this.plugins,
    treeshake: !this.developmentMode,
    watch: WATCH,
  });

  private readonly external = (id: string): boolean => {
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
}
