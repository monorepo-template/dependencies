# TypeScript ESLint config

`@monorepo-template/eslint-config-typescript` is an ESLint configuration for
TypeScript support. It does not enforce any rules, but it instead disables
rules that would be impossible to enforce.

## Install

```sh
yarn add --dev "@monorepo-template/eslint-config-typescript"
```

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
      "files": ["*.eslintrc.cjs"],
      "extends": "@monorepo-template/typescript/eslint"
    },

    {
      "files": ["*.json"],
      "extends": ["@monorepo-template/typescript/json"]
    },

    {
      "files": ["*.ts", "*.tsx"],
      "extends": ["@monorepo-template/typescript/ts"]
    }
  ]
}
```

If you are using other configurations outside of the `@monorepo-template` scope,
this should come _after_ those configurations in the `extends` array.
