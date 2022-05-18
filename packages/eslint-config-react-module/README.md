# React module ESLint config

`@monorepo-template/eslint-config-react-module` is an ESLint configuration
for monorepo React modules. As a result, configurations included in
[the monorepo template root](https://github.com/monorepo-template/monorepo-template/blob/main/.eslintrc.json)
are not included in this configuration.

No rules are managed by this configuration directly. Instead, it extends from a
collection of ESLint configurations for React modules.

## Install

To install the React module ESLint config and its peer dependencies, run:

```sh
yarn add --dev "@monorepo-template/eslint-config-react-module" eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
```

## Use

_Merge_ the following ESLint configuration into your `.eslintrc.json` file:

```json
{
  "extends": ["@monorepo-template/react-module"]
}
```
