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

```sh
yarn add --dev "@monorepo-template/eslint-config-typescript-strict" "@typescript-eslint/eslint-plugin" "@typescript-eslint/parser"
```

## Use

_Merge_ the following ESLint configuration into your `.eslintrc.json` file:

```json
{
  "extends": ["@monorepo-template/typescript-strict"]
}
```

If you are using other configurations outside of the `@monorepo-template` scope,
this should come _after_ those configurations in the `extends` array.
