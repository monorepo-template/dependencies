# Cypress coverage plugin

The monorepo template's Cypress coverage plugin is a
[monkey-patch](https://en.wikipedia.org/wiki/Monkey_patch) of Cypress's official
code coverage plugin, adding pre-configuration of NYC and support for
`nyc.config.cjs`.

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
