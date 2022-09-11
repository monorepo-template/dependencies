import type { CoverageMap } from 'istanbul-lib-coverage';
interface Options {
    readonly enableLogging: boolean;
    readonly paths: readonly string[];
    readonly reporter: readonly (string | readonly [string, Readonly<Record<string, unknown>>])[];
    readonly workingDirectory: string;
}
export default function getCoverageMap({ enableLogging, paths, reporter, workingDirectory, }: Options): Promise<CoverageMap>;
export {};
