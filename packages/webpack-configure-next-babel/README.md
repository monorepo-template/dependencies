# Configure Babel for Next

This package offers a Webpack configuration to support custom Babel
configurations for Next applications.

This allows you to use _dynamic_ Babel configurations in your Next applications,
e.g. a `next.babel.mjs` file instead of only a statiic `.babelrc.json` file.

## Install

```sh
yarn add --dev "@monorepo-template/webpack-configure-next-babel"
```

## Use

If you are not already using a custom Webpack configuration for your Next
application, the simplest solution is this:

```js
// next.config.js
import configureBabel from '@monorepo-template/webpack-configure-next-babel';
import babelConfig from './next.babel.mjs';

export default {
  webpack: configureBabel(babelConfig),
};
```

If you want to customize your Webpack configuration further, pass the `webpack`
method's parameters to the function returned by `configureBabel(babelConfig)`.
This will generate a Webpack config object that you can merge with your custom configuration.

```js
// next.config.js
import configureBabel from '@monorepo-template/webpack-configure-next-babel';
import babelConfig from './next.babel.mjs';

export default {
  webpack(config, options) {
    return {
      ...configureBabel(babelConfig)(config, options),
      custom: 'configuration',
    };
  },
};
```

The Babel configuration is a function of the Webpack configuration context:

```js
// next.babel.mjs
export default function nextBabelConfig({ dev }) {
  if (!dev) {
    return;
  }

  return {
    plugins: ['babel-plugin-istanbul'],
    presets: ['next/babel'],
  };
}
```
