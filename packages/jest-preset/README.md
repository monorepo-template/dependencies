# Jest preset

Jest preset for monorepo templates

## Install

This module depends on Babel as a peer dependency.

```sh
yarn add --dev "@babel/core" "@babel/preset-env" "@babel/preset-react" "@babel/preset-typescript" "@monorepo-template/jest-preset" babel-jest identity-obj-proxy
```

## Common problems

```
TypeError: Cannot read property 'cwd' of undefined
  at Object.getCacheKey
```

This error occurs when `babel-jest` and `jest` have different major versions.
Resolve this by either upgrading one (preferred) or downgrading the other (if
necessary) such that they share a major version.
