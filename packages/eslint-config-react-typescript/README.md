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
