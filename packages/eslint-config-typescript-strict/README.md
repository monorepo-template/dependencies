# Strict TypeScript ESLint config

`@monorepo-template/eslint-config-typescript-strict` is an ESLint configuration
comprised of TypeScript rules all set to `error`. The intention of this rule is
to abstract all decision-making and opinion from lint rules, unifying teams with
an established code style without weighing preference to one or more individual
members.

This configuration does _not_ include `@monorepo-template/typescript-fixable` or
`@typescript-eslint/recommended`. It is recommended that you use both in
addition to this configuration.

## Install

- `npm install --save-dev @monorepo-template/eslint-config-typescript-strict` or
- `yarn add --dev @monorepo-template/eslint-config-typescript-strict`

## Use

_Merge_ the following ESLint configuration into your `.eslintrc.json` file:

```json
{
  "extends": ["@monorepo-template/typescript-strict"]
}
```
