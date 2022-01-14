# Jest transformer

Jest transformer for monorepo templates

## Common issues

### `TypeError: Cannot read properties of undefined (reading 'cwd')`

```
TypeError: Cannot read properties of undefined (reading 'cwd')
      at Object.getCacheKey
```

This error occurs when `babel-jest` and `jest` are two different versions. You
can resolve this by upgrading both to latest, using `yarn up -R babel-jest` to
upgrade `babel-jest` and `yarn up jest` to upgrade `jest`. This module was
written with the intention of supporting `babel-jest` and `jest` versions
`^27.0.0`.
