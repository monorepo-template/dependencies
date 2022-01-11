# Strict React ESLint config

`@monorepo-template/eslint-config-react-strict` is an ESLint configuration
comprised of React rules all set to `error`. The intention of this rule is to
abstract all decision-making and opinion from lint rules, unifying teams with an
established code style without weighing preference to one or more individual
members.

This configuration does _not_ include `@monorepo-template/react-fixable`,
`@monorepo-template/react-typescript`, `plugin:jsx-a11y/strict`,
`plugin:react-hooks/recommended`, or `plugin:react/recommended`. It is
recommended that you use these aforementioned configurations in addition to this
configuration.

## Install

- `npm install --save-dev @monorepo-template/eslint-config-react-strict` or
- `yarn add --dev @monorepo-template/eslint-config-react-strict`

## Use

_Merge_ the following ESLint configuration into your `.eslintrc.json` file:

```json
{
  "extends": ["@monorepo-template/react-strict"]
}
```
