interface Options {
    readonly enableLogging?: boolean | undefined;
    readonly outputDirectory?: string | undefined;
    readonly outputFile?: string | undefined;
    readonly reporter?: readonly (string | readonly [string, Readonly<Record<string, unknown>>])[] | undefined;
    readonly workingDirectory?: string | undefined;
}
export default function mergeCoverage(paths: readonly string[], { enableLogging, outputDirectory, outputFile, reporter, workingDirectory, }?: Options): Promise<void>;
export {};
