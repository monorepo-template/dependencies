# React module ESLint config

`@monorepo-template/eslint-config-react-module` is an ESLint configuration
comprised of rules enforcing best practices for React modules. No rules are
managed by this configuration directly. Instead, it extends from a collection of
ESLint configurations, allowing you to easily eject from this configuration and
mix-and-match configurations to suit your needs.

## Install

- `npm install --save-dev @monorepo-template/eslint-config-react-module` or
- `yarn add --dev @monorepo-template/eslint-config-react-module`

## Use

_Merge_ the following ESLint configuration into your `.eslintrc.json` file:

```json
{
  "extends": ["@monorepo-template/react-module"]
}
```

If your React module is not a package in a monorepo, additionally _merge_ the
following ESLint configuration into your `.eslintrc.json` file:

```json
{
  "root": true
}
```
