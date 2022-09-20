import requireResolve from '../utils/require-resolve';

const TYPESCRIPT_FILE_PATH = '^.+\\.tsx?$';

const TRANSFORM: Record<string, string> = {
  [TYPESCRIPT_FILE_PATH]: requireResolve('@monorepo-template/jest-transformer'),
};

export default TRANSFORM;
