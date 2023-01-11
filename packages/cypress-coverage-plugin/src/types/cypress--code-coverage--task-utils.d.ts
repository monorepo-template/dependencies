declare module '@cypress/code-coverage/task-utils' {
  import type { Options } from 'nyc';

  export const checkAllPathsNotFound: unknown;
  export const includeAllFiles: unknown;
  export const readNycOptions: (workingDirectory: string) => Options;
  export const resolveRelativePaths: unknown;
  export const showNycInfo: unknown;
  export const tryFindingLocalFiles: unknown;
}
