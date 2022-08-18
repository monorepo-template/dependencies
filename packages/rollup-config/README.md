# Rollup configuration

Rollup configuration for monorepo template modules

## Install

```sh
yarn add --dev "@monorepo-template/rollup-config" "@rollup/plugin-commonjs" "@rollup/plugin-node-resolve" rollup-plugin-insert rollup-plugin-typescript2
```

## Use

The default configuration is optimized for most Node modules.

```js
// rollup.config.js
export { default } from '@monorepo-template/rollup-config';
```

If your module needs to support React < 16.14.0 or multiple inputs, you will
want to [customize your configuration](#custom).

## Custom

To create a customized Rollup configuration, import from `/new`:

```js
// rollup.config.js
import RollupConfig from '@monorepo-template/rollup-config/new';

export default new RollupConfig()
  .addInput('button', 'src/components/button/index.ts')
  .addInput('table', 'src/components/table/index.ts')
  .disableDevelopmentMode()
  .disableJsxRuntime() // support React < 16.14.0
  .setCjsDirectory('./dist/my-cjs')
  .setDevelopmentTSConfigPath('./tsconfig.development.json')
  .setEsmDirectorry('./dist/my-esm')
  .setExternalDependency('react-router') // do not bundle `react-router`
  .setFileName('custom') // outputs `custom.js`
  .setPlugins(plugins => [...plugins, newPlugin])
  .setTSConfigPath('./tsconfig.json')
  .toJSON();
```
