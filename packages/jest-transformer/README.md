# Jest transformer

Jest transformer for monorepo templates

## Install

This module depends on Babel as a peer dependency.

```sh
yarn add --dev "@babel/core" "@babel/preset-env" "@babel/preset-react" \
  "@babel/preset-typescript" "@monorepo-template/jest-transformer" babel-jest
```

## Common issues

### `TypeError: Cannot read properties of undefined (reading 'cwd')`

```
TypeError: Cannot read properties of undefined (reading 'cwd')
      at Object.getCacheKey
```

This error occurs when `babel-jest` and `jest` are different versions. You can
resolve this by upgrading both to latest, using `yarn up babel-jest` to upgrade
`babel-jest` and `yarn up jest` to upgrade `jest`.
