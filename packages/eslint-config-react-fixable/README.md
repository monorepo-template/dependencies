# Fixable React ESLint config

`@monorepo-template/eslint-config-react-fixable` is an ESLint configuration
comprised solely of _fixable_ React rules, minus any rules that conflict with
`eslint-plugin-prettier`. As a result, no manual effort is required to adhere to
this configuration's rules.

It is recommended that you use this rule in tandem with
`plugin:prettier/recommended`.

## Install

```sh
yarn add --dev "@monorepo-template/eslint-config-react-fixable" eslint-plugin-react
```

## Use

_Merge_ the following ESLint configuration into your `.eslintrc.json` file:

```json
{
  "extends": ["@monorepo-template/react-fixable"]
}
```

If you are using other configurations outside of the `@monorepo-template` scope,
this should come _after_ those configurations in the `extends` array.
