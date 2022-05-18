# Cypress coverage config-override

Cypress coverage config-override is a `react-app-rewired` config override that
enables coverage for Cypress tests.

## Install

This package relies on `babel-plugin-istanbul` for generating coverage reports.

```sh
yarn add --dev "@monorepo-template/cypress-coverage-config-override" babel-plugin-istanbul
```

## Use

Bootstrap your React application with Cypress coverage by using
`react-app-rewired`'s `config-overrides.js` file.

```js
const cypressConfigOverride = require('@monorepo-template/cypress-coverage-config-override');

module.exports = function override(config, env) {
  // For non-development environments, do not monitor code coverage.
  if (env !== 'development') {
    return config;
  }

  return cypressConfigOverride(config);
};
```

## Credit

This package was inspired by
[`@cypress/instrument-cra`](https://github.com/cypress-io/instrument-cra) and
much of this package's logic is pulled from `@cypress/instrument-cra`'s source
code.

`@cypress/instrument-cra`'s path resolution does not support Yarn 2
plug-and-play, so this package attempts to achieve the same goal by replacing
`@cypress/instrument-cra`'s path resolution with that of `react-app-rewired`'s.
