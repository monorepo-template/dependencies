# React TypeScript ESLint config

`@monorepo-template/eslint-config-react-typescript` is an ESLint configuration
comprised of React TypeScript rules all set to `error`. The intention of this
rule is to abstract all decision-making and opinion from lint rules, unifying
teams with an established code style without weighing preference to one or more
individual members.

## Install

- `npm install --save-dev @monorepo-template/eslint-config-react-typescript` or
- `yarn add --dev @monorepo-template/eslint-config-react-typescript`

## Use

_Merge_ the following ESLint configuration into your `.eslintrc.json` file:

```json
{
  "extends": ["@monorepo-template/react-typescript"],

  "overrides": [
    {
      "files": ["*.json"],
      "extends": ["@monorepo-template/react-typescript/json"]
    }
  ]
}
```

If you are using other configurations outside of the `@monorepo-template` scope,
this should come _after_ those configurations in the `extends` array.

### `react-scripts@^4`

If you are using `react-scripts` v4, also _merge_ the following ESLint
configuration into your `.eslintrc.json` file:

```json
{
  "extends": ["@monorepo-template/react-typescript/react-scripts-4"]
}
```

If you are using `@monorepo-template/typescript-strict`, then
`@monorepo-template/react-typescript/react-scripts-4` should come after it in
the `extends` array.

This is because `react-scripts@^4` is not compatible with an ESLint rule in the
latest version of the `@typescript-eslint` plugin.
