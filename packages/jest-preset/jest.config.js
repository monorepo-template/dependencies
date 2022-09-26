const TYPESCRIPT_FILE_PATH = '^.+\\.tsx?$';

export default {
  preset: './dist/esm/index.js',
  transform: {
    [TYPESCRIPT_FILE_PATH]: [
      'babel-jest',
      {
        sourceType: 'module',
      },
    ],
  },
};
