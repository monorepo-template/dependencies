# React module ESLint parser TypeScript configuration

The `@monorepo-template/react-module-eslint-tsconfig` package is a
development-ready TypeScript configuration for React modules' ESLint parsers. It
extends the
[monorepo template TypeScript configuration](https://www.npmjs.com/package/@monorepo-template/tsconfig)
by adding React-specific compiler options.

## Use

Add the TypeScript configuration to your project with
`yarn add --dev @monorepo-template/react-module-eslint-tsconfig`.

Change your `tsconfig.eslint.json` file to extend this preconfiguration:

```json
{
  "extends": "@monorepo-template/react-module-eslint-tsconfig"
}
```
