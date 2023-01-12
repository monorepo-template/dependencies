/* eslint-disable @typescript-eslint/naming-convention */

declare module 'nyc' {
  interface Config {
    readonly excludeAfterRemap: boolean;
  }

  interface Exclude {
    readonly shouldInstrument: (filename: string) => boolean;
  }

  interface Options {
    readonly _processInfo?: unknown;
    readonly all?: boolean | undefined;
    readonly cache?: boolean | undefined;
    readonly cacheDir?: string | undefined;
    readonly checkCoverage?: boolean | undefined;
    readonly compact?: boolean | undefined;
    readonly completeCopy?: boolean | undefined;
    readonly cwd?: string | undefined;
    readonly eager?: boolean | undefined;
    readonly esModules?: unknown;
    readonly exclude?: readonly string[] | undefined;
    readonly excludeAfterRemap?: boolean | undefined;
    readonly excludeNodeModules?: boolean | undefined;
    readonly exitOnError?: boolean | undefined;
    readonly extension?: readonly string[] | undefined;
    readonly hookRequire?: unknown;
    readonly hookRunInContext?: unknown;
    readonly hookRunInThisContext?: unknown;
    readonly ignoreClassMethod?: unknown;
    readonly include?: string | readonly string[] | undefined;
    readonly instrumenter?: string | undefined;
    readonly isChildProcess?: boolean | undefined;
    readonly parserPlugins?: unknown;
    readonly preserveComments?: boolean | undefined;
    readonly produceSourceMap?: boolean | undefined;
    readonly reportDir?: string | undefined;
    readonly reporter: readonly (
      | string
      | readonly [string, Readonly<Record<string, unknown>>]
    )[];
    readonly require?: readonly string[] | undefined;
    readonly showProcessTree?: boolean | undefined;
    readonly skipEmpty?: boolean | undefined;
    readonly skipFull?: boolean | undefined;
    readonly sourceMap?: boolean | undefined;
    readonly subprocessBin?: string | undefined;
    readonly tempDirectory?: string | undefined;
    readonly useSpawnWrap?: boolean | undefined;
    readonly watermarks?: unknown;
  }

  export interface NYCThresholds {
    readonly branches?: number | undefined;
    readonly functions?: number | undefined;
    readonly lines?: number | undefined;
    readonly statements?: number | undefined;
  }

  interface SourceMaps {
    readonly remapCoverage: <T>(data: T) => Promise<T>;
  }

  export default class NYC {
    public config: Config;

    public exclude: Exclude;

    public sourceMaps: SourceMaps;
    public constructor(options: Options);
    public checkCoverage(
      thresholds: NYCThresholds,
      perFile: boolean,
    ): Promise<void>;
    public coverageFileLoad<T>(file: string, path: string): Promise<T>;
    public coverageFiles(path: string): Promise<readonly string[]>;
    public report(): Promise<void>;
  }
}
