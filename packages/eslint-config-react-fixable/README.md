# Fixable React ESLint config

`@monorepo-template/eslint-config-react-fixable` is an ESLint configuration
comprised solely of _fixable_ React rules. As a result, no manual effort is
required to adhere to this configuration's rules.

## Install

- `npm install --save-dev @monorepo-template/eslint-config-react-fixable` or
- `yarn add --dev @monorepo-template/eslint-config-react-fixable`

## Use

_Merge_ the following ESLint configuration into your `.eslintrc.json` file:

```json
{
  "extends": ["@monorepo-template/react-fixable"]
}
```
