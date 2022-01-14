# Jest transformer

Jest transformer for monorepo templates

## Common issues

### `TypeError: Cannot read properties of undefined (reading 'cwd')`

```
TypeError: Cannot read properties of undefined (reading 'cwd')
      at Object.getCacheKey
```

This error occurs when `babel-jest` and `jest` are two different versions. You
can resolve this by upgrading both to latest, using `yarn up babel-jest jest`.
This module was written with `babel-jest` and `jest` version `^7.0.0`.
