# Configure Yarn Berry for Next

This package offers a Webpack configuration to support Yarn Berry (Yarn v2 and
v3) for Next applications.

## Install

```sh
yarn add --dev "@monorepo-template/webpack-configure-next-yarn-berry"
```

## Use

If you are not already using a custom Webpack configuration for your Next
application, the simplest solution is this:

```js
// next.config.js
import configureYarnBerry from '@monorepo-template/webpack-configure-next-yarn-berry';

export default {
  webpack: configureYarnBerry,
};
```

If you want to customize your Webpack configuration further, pass the `webpack`
method's parameters to the `configureYarnBerry` function. This will generate a
Webpack config object that you can merge with your custom configuration.

```js
// next.config.js
import configureYarnBerry from '@monorepo-template/webpack-configure-next-yarn-berry';

export default {
  webpack(config, options) {
    return {
      ...configureYarnBerry(config, options),
      custom: 'configuration',
    };
  },
};
```
