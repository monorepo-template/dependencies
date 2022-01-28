# React module TypeScript configuration

The `@monorepo-template/react-module-tsconfig` package is a production-ready
TypeScript configuration for React modules. It extends the
[monorepo template TypeScript configuration](https://www.npmjs.com/package/@monorepo-template/tsconfig)
by adding React-specific compiler options, such as JSX support, type
declarations, and more.

## Use

Add the TypeScript configuration to your project with
`yarn add --dev @monorepo-template/react-module-tsconfig`.

Change your `tsconfig.json` file to extend this preconfiguration:

```json
{
  "extends": "@monorepo-template/react-module-tsconfig"
}
```
