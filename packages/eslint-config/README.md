# ESLint configurations

`@monorepo-template/eslint-config` is a collection of common ESLint
configurations.

## Install

To install the base package, run:

```sh
yarn add --dev "@monorepo-template/eslint-config"
```

Pick the rules you want to use below, install their dependencies, and merge
their provided configurations with any existing configurations you have.

- [React fixable](#react-fixable)
- [React strict](#react-strict)
- [React TypeScript](#react-typescript)
- [TypeScript](#typescript)
- [TypeScript fixable](#typescript-fixable)
- [TypeScript strict](#typescript-strict)

## React fixable

**For:** adhering to _fixable_ rules that require no manual effort

**Dependencies:**

```sh
yarn add --dev eslint-plugin-react
```

**Configuration:**

```json
{
  "extends": ["@monorepo-template/eslint-config/react-fixable"]
}
```

**Notes:**

- `@monorepo-template/eslint-config/react-fixable` does not include rules that
  conflict with `plugin:prettier/recommended`. We recommend you additionally
  extend it.

## React strict

**For:** strongly opinionated rules

**Dependencies:**

```sh
yarn add --dev eslint-plugin-react eslint-plugin-react-hooks
```

**Configuration:**

```json
{
  "extends": ["@monorepo-template/eslint-config/react-strict"]
}
```

**Notes:**

- `@monorepo-template/eslint-config/react-strict` does not include rules that
  are already covered by [React fixable](#react-fixable). We recommended that
  you additionally extend it.
- `@monorepo-template/eslint-config/react-strict` does not include rules that
  are already covered by [React TypeScript](#react-typescript). We recommended
  that you additionally extend it if you are using TypeScript.
- We recommend you additionally extend `plugin:jsx-a11y/strict`,
  `plugin:react/recommended`, and `plugin:react-hooks/recommended`.

## React TypeScript

**For:** React packages written in TypeScript

**Configuration:**

```json
{
  "extends": ["@monorepo-template/eslint-config/react-typescript"],

  "overrides": [
    {
      "files": ["*.json"],
      "extends": ["@monorepo-template/eslint-config/react-typescript/json"]
    }
  ]
}
```

**Notes:**

- If you are using `react-scripts` v4, you should additionally extend
  `@monorepo-template/eslint-config/react-typescript/react-scripts-4`.
- `@monorepo-template/eslint-config/react-typescript` does not include rules
  that are already covered by [TypeScript](#typescript). We recommended that you
  additionally extend it by copying its configuration.

## TypeScript

**For:** TypeScript packages

**Dependencies:**

```sh
yarn add --dev "@typescript-eslint/eslint-plugin" "@typescript-eslint/parser"
```

**Configuration:**

```json
{
  "extends": ["@monorepo-template/eslint-config/typescript"],

  "overrides": [
    {
      "files": ["*.cjs", "*.js", "*.jsx"],
      "extends": "@monorepo-template/eslint-config/typescript/cjs"
    },

    {
      "files": ["*.cjs", "*.js", "*.jsx", "*.mjs"],
      "extends": ["@monorepo-template/eslint-config/typescript/js"]
    },

    {
      "files": ["*.eslintrc.cjs"],
      "extends": "@monorepo-template/eslint-config/typescript/eslint"
    },

    {
      "files": ["*.json"],
      "extends": ["@monorepo-template/eslint-config/typescript/json"]
    },

    {
      "files": ["*.ts", "*.tsx"],
      "extends": ["@monorepo-template/eslint-config/typescript/ts"]
    }
  ]
}
```

**Notes:**

- `@monorepo-template/eslint-config/typescript` only disables rules that are
  impossible to enforce in a TypeScript package. To enable rules, we recommend
  using the [TypeScript fixable](#typescript-fixable) and
  [TypeScript strict](#typescript-strict) rule sets.

## TypeScript fixable

**For:** adhering to _fixable_ rules that require no manual effort

**Dependencies:**

```sh
yarn add --dev "@typescript-eslint/eslint-plugin" "@typescript-eslint/parser"
```

**Configuration:**

```json
{
  "extends": ["@monorepo-template/eslint-config/typescript-fixable"],

  "overrides": [
    {
      "files": ["*.cjs", "*.js", "*.jsx", "*.mjs"],
      "extends": ["@monorepo-template/eslint-config/typescript-fixable/js"]
    },

    {
      "files": ["*.json"],
      "extends": ["@monorepo-template/eslint-config/typescript-fixable/json"]
    }
  ]
}
```

## TypeScript strict

**For:** strongly opinionated rules

**Dependencies:**

```sh
yarn add --dev "@typescript-eslint/eslint-plugin" "@typescript-eslint/parser"
```

**Configuration:**

```json
{
  "extends": ["@monorepo-template/eslint-config/typescript-strict"]
}
```

**Notes:**

- `@monorepo-template/eslint-config/typescript-strict` does not include rules
  already covered by [TypeScript fixable](#typescript-fixable). We recommend
  that you additionally extend it by copying its configuration.
- `@monorepo-template/eslint-config-typescript-strict` does not include rules
  already covered by `plugin:@typescript-eslint/recommended`. We recommended
  that you additionally extend it.
