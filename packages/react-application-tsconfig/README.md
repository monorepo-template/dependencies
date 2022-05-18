# React application TypeScript configuration

The `@monorepo-template/react-application-tsconfig` package contains
production-ready TypeScript configurations for React applications. It extends
the
[monorepo template TypeScript configuration](https://www.npmjs.com/package/@monorepo-template/tsconfig)
by adding React-specific compiler options, such as JSX support, type
declarations, and more.

## Install

```sh
yarn add --dev "@monorepo-template/react-application-tsconfig" "@types/jest"
```

## Use

Change your `tsconfig.json` file to extend this preconfiguration:

```json
{
  "extends": "@monorepo-template/react-application-tsconfig"
}
```

Change your `tsconfig.cypress.json` file to extend this preconfiguration:

```json
{
  "extends": "@monorepo-template/react-application-tsconfig/cypress"
}
```

Change your `tsconfig.development.json` file to extend this preconfiguration:

```json
{
  "extends": "@monorepo-template/react-application-tsconfig/development"
}
```

Change your `tsconfig.eslint.json` file to extend this preconfiguration:

```json
{
  "extends": "@monorepo-template/react-application-tsconfig/eslint"
}
```
