# Cypress coverage plugin

The monorepo template's Cypress coverage plugin is a
[monkey-patch](https://en.wikipedia.org/wiki/Monkey_patch) of Cypress's official
code coverage plugin, adding pre-configuration of NYC and support for
`nyc.config.cjs`.

## Install

This package relies on both `@cypress/code-coverage` and `cypress` as peer
dependencies for runtime behavior and type definitions, respectively.

```
yarn install --dev @cypress/code-coverage @monorepo-template/cypress-coverage-plugin cypress
```

## Use

In your Cypress plugin file (`cypress/plugin/index.ts`), import the plugin:

```js
/// <reference types="cypress" />
import cypressCoveragePlugin from '@monorepo-template/cypress-coverage-plugin';

export default function cypressPlugins(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Cypress.PluginConfigOptions {
  return cypressCoveragePlugin(on, config);
}
```
