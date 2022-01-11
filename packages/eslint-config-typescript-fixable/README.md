# Fixable TypeScript ESLint config

`@monorepo-template/eslint-config-typescript-fixable` is an ESLint configuration
comprised solely of _fixable_ TypeScript rules. As a result, no manual effort is
required to adhere to this configuration's rules.

## Install

- `npm install --save-dev @monorepo-template/eslint-config-typescript-fixable`
  or
- `yarn add --dev @monorepo-template/eslint-config-typescript-fixable`

## Use

_Merge_ the following ESLint configuration into your `.eslintrc.json` file:

```json
{
  "extends": ["@monorepo-template/typescript-fixable"],

  "overrides": [
    {
      "files": ["*.cjs", "*.js", "*.jsx", "*.mjs"],
      "extends": ["@monorepo-template/typescript-fixable/js"]
    },

    {
      "files": ["*.json"],
      "extends": ["@monorepo-template/typescript-fixable/json"]
    }
  ]
}
```
