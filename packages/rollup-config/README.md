# Rollup configuration

Rollup configuration for monorepo template modules

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
  .disableDevelopmentMode()
  .disableJsxRuntime() // support React < 16.14.0
  .setDevelopmentTSConfigPath('./tsconfig.development.json')
  .setExternalDependency('react-router') // do not bundle `react-router`
  .setTSConfigPath('./tsconfig.json')
  .setInput('button', 'src/components/button/index.ts')
  .setInput('table', 'src/components/table/index.ts')
  .toJSON();
```
