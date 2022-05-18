import requireResolve from '../utils/require-resolve.mjs';

const TRANSFORM = {
  '^.+\\.tsx?$': requireResolve('@monorepo-template/jest-transformer'),
};

export default TRANSFORM;
