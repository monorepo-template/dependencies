# Fixable TypeScript ESLint config

`@monorepo-template/eslint-config-typescript-fixable` is an ESLint configuration
comprised solely of _fixable_ TypeScript rules. As a result, no manual effort is
required to adhere to this configuration's rules.

## Install

```sh
yarn add --dev "@monorepo-template/eslint-config-typescript-fixable" "@typescript-eslint/eslint-plugin" "@typescript-eslint/parser"
```

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

If you are using other configurations outside of the `@monorepo-template` scope,
this should come _after_ those configurations in the `extends` array.
