/// <reference types="../../types/nyc" />
import type { NYCThresholds } from 'nyc';
interface Options {
    readonly paths: readonly string[];
    readonly tempDirectory: string;
    readonly thresholds: NYCThresholds;
    readonly workingDirectory: string;
}
export default function coverage({ paths, tempDirectory, thresholds, workingDirectory, }: Options): Promise<void>;
export {};
