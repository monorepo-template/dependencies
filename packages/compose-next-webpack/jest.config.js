export default {
  preset: '@monorepo-template/jest-module-preset',

  // Cannot enforce due to inability to test:
  // https://github.com/yarnpkg/berry/issues/1818
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};
