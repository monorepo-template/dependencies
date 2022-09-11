declare module 'nyc' {
  interface Config {
    readonly excludeAfterRemap: boolean;
  }

  interface Exclude {
    readonly shouldInstrument: (filename: string) => boolean;
  }

  interface Options {
    readonly cwd?: string | undefined;
    readonly reporter: readonly (
      | string
      | readonly [string, Readonly<Record<string, unknown>>]
    )[];
    readonly skipEmpty?: boolean | undefined;
    readonly skipFull?: boolean | undefined;
    readonly tempDirectory?: string | undefined;
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
