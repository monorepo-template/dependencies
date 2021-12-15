    3. For each module, add the `version`, `minzipped size`, `downloads`, and
       `GitHub Action: Module push` badges, then replace
       `CharlesStover/monorepo-template` with your repository and
       `@monorepo-template/module` with your module's package name.
    4. Under `Contributing`, change the `yarn` commands from `application:*` and
       `module:*` to match your workspace names.

---

# Monorepo template dependencies

[![version](https://img.shields.io/npm/v/@monorepo-template/coverage.svg?label=coverage)](https://www.npmjs.com/package/@monorepo-template/coverage)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@monorepo-template/coverage.svg)](https://www.npmjs.com/package/@monorepo-template/coverage)
[![downloads](https://img.shields.io/npm/dt/@monorepo-template/coverage.svg)](https://www.npmjs.com/package/@monorepo-template/coverage)
[![GitHub Action: Coverage push](https://github.com/CharlesStover/monorepo-template-dependencies/actions/workflows/coverage-push.yml/badge.svg?branch=main)](https://github.com/CharlesStover/monorepo-template-dependencies/actions/workflows/coverage-push.yml)

[![version](https://img.shields.io/npm/v/@monorepo-template/cypress-coverage-config-override.svg?label=cypress-coverage-config-override)](https://www.npmjs.com/package/@monorepo-template/coverage)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@monorepo-template/cypress-coverage-config-override.svg)](https://www.npmjs.com/package/@monorepo-template/cypress-coverage-config-override)
[![downloads](https://img.shields.io/npm/dt/@monorepo-template/cypress-coverage-config-override.svg)](https://www.npmjs.com/package/@monorepo-template/cypress-coverage-config-override)
[![GitHub Action: Cypress coverage config-override push](https://github.com/CharlesStover/monorepo-template-dependencies/actions/workflows/cypress-coverage-config-override-push.yml/badge.svg?branch=main)](https://github.com/CharlesStover/monorepo-template-dependencies/actions/workflows/cypress-coverage-config-override-push.yml)

[![version](https://img.shields.io/npm/v/@monorepo-template/merge-coverage.svg?label=merge-coverage)](https://www.npmjs.com/package/@monorepo-template/merge-coverage)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@monorepo-template/merge-coverage.svg)](https://www.npmjs.com/package/@monorepo-template/merge-coverage)
[![downloads](https://img.shields.io/npm/dt/@monorepo-template/merge-coverage.svg)](https://www.npmjs.com/package/@monorepo-template/merge-coverage)
[![GitHub Action: Merge coverage push](https://github.com/CharlesStover/monorepo-template-dependencies/actions/workflows/merge-coverage-push.yml/badge.svg?branch=main)](https://github.com/CharlesStover/monorepo-template-dependencies/actions/workflows/merge-coverage-push.yml)

[![version](https://img.shields.io/npm/v/@monorepo-template/test.svg?label=test)](https://www.npmjs.com/package/@monorepo-template/test)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@monorepo-template/test.svg)](https://www.npmjs.com/package/@monorepo-template/test)
[![downloads](https://img.shields.io/npm/dt/@monorepo-template/test.svg)](https://www.npmjs.com/package/@monorepo-template/test)
[![GitHub Action: Test push](https://github.com/CharlesStover/monorepo-template-dependencies/actions/workflows/test-push.yml/badge.svg?branch=main)](https://github.com/CharlesStover/monorepo-template-dependencies/actions/workflows/test-push.yml)

The `monorepo-template-dependencies` repository contains the dependencies for
the
[`monorepo-template` repository](https://github.com/CharlesStover/monorepo-template/).

## Contributing

To contribute to this repository, start by running the following commands.

- To keep Yarn up to date, run `yarn set version latest`.
- To keep dependencies up to date, run `yarn up "*" "@*/*"`.
- If you use VIM, run `yarn sdks vim`.
- If you use Visual Studio Code, run `yarn sdks vscode`.

To test your changes to the repository, run `yarn test`.

### `coverage`

- To lint your changes to the module, run `yarn coverage:eslint`.

### `cypress-coverage-config-override`

- To lint your changes to the module, run
  `yarn cypress-coverage-config-override:eslint`.
- To unit test your changes to the module, run
  `yarn cypress-coverage-config-override:jest`.

### `merge-coverage`

- To lint your changes to the module, run `yarn merge-coverage:eslint`.
