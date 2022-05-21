# Compose NextJS Webpack configs

The NextJS Webpack config `compose` function allows you to compose multiple
Webpack config functions for better readability and maintainability of your
`next.config.js` file.

To provide an unbiased comparison, the below examples use the same naming
conventions and spacing.

```js
// Before
import createConfigureBabel from '@monorepo-template/webpack-configure-next-babel';
import configureYarnBerry from '@monorepo-template/webpack-configure-next-yarn-berry';
import nextBabelConfig from './next.babel.mjs';

// Difficult to read nesting 👎
// Repetitive parameters 👎

export default {
  webpack(config, options) {
    const configureBabel = createConfigureBabel(nextBabelConfig);
    return configureBabel(configureYarnBerry(config, options), options);
  },
};
```

```js
// After
import compose from '@monorepo-template/compose-next-webpack';
import createConfigureBabel from '@monorepo-template/webpack-configure-next-babel';
import configureYarnBerry from '@monorepo-template/webpack-configure-next-yarn-berry';
import nextBabelConfig from './next.babel.mjs';

// No nesting 👍
// No parameters 👍

const configureBabel = createConfigureBabel(nextBabelConfig);
export default {
  webpack: compose(configureBabel, configureYarnBerry),
};
```

## Install

```sh
yarn add --dev "@monorepo-template/compose-next-webpack"
```
