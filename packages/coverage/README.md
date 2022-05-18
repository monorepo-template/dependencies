# Coverage

The `@monorepo-template/coverage` module generates a coverage report given
_multiple_ coverage report paths.

## Install

This package rules on NYC to generate coverage reports.

```sh
yarn add --dev "@monorepo-template/coverage" istanbul-lib-coverage make-dir nyc p-map
```

## Usage

### Command line

Use the `monorepo-template-coverage` command to generate a coverage report for
Cypress (`/cypress/coverage/`) and Jest (`/jest/coverage/`).

### Module

To generate a merged coverage report manually, you may import this module into a
custom Node script.

```js
import coverage from '@monorepo-template/coverage';

await coverage({
  paths: ['/cypress/coverage/', '/jest/coverage/'],
  tempDirectory: '.nyc_output',
  workingDirectory: process.cwd(),
  thresholds: {
    branches: 100,
    functions: 100,
    lines: 100,
    statements: 100,
  },
});
```

The final coverage report will be located at `/coverage/`.
