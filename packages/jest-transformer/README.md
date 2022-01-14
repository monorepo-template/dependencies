# Jest transformer

Jest transformer for monorepo templates

## Install

The monorepo template Jest transformer relies on Babel as a peer dependency. To
install it and its required peer dependencies, use the following command:

```
yarn add --dev @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @monorepo-template/jest-transformer babel-jest
```

## Common issues

### `TypeError: Cannot read properties of undefined (reading 'cwd')`

```
TypeError: Cannot read properties of undefined (reading 'cwd')
      at Object.getCacheKey
```

This error occurs when `babel-jest` and `jest` are two different versions. You
can resolve this by upgrading both to latest, using `yarn up babel-jest jest`.
This module was written with `babel-jest` and `jest` version `^27.0.0`.
