# React module TypeScript configuration

The `@monorepo-template/react-module-tsconfig` package contains production-ready
TypeScript configurations for React modules. It extends the
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

If you do not want your module to use
[the React 17 JSX transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html),
extend this preconfiguration instead:

```json
{
  "extends": "@monorepo-template/react-module-tsconfig/no-jsx-runtime"
}
```

Change your `tsconfig.development.json` file to extend this preconfiguration:

```json
{
  "extends": "@monorepo-template/react-module-tsconfig/development"
}
```

Change your `tsconfig.eslint.json` file to extend this preconfiguration:

```json
{
  "extends": "@monorepo-template/react-module-tsconfig/eslint"
}
```
