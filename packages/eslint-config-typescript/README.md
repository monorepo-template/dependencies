# TypeScript ESLint config

`@monorepo-template/eslint-config-typescript` is an ESLint configuration for
TypeScript support. It does not enforce any rules, but it instead disables
rules that would be impossible to enforce.

## Install

- `npm install --save-dev @monorepo-template/eslint-config-typescript` or
- `yarn add --dev @monorepo-template/eslint-config-typescript`

## Use

_Merge_ the following ESLint configuration into your `.eslintrc.json` file:

```json
{
  "extends": ["@monorepo-template/typescript"],

  "overrides": [
    {
      "files": ["*.cjs", "*.js", "*.jsx"],
      "extends": "@monorepo-template/typescript/cjs"
    },

    {
      "files": ["*.cjs", "*.js", "*.jsx", "*.mjs"],
      "extends": ["@monorepo-template/typescript/js"]
    },

    {
      "files": ["*.json"],
      "extends": ["@monorepo-template/typescript/json"]
    }
  ]
}
```
