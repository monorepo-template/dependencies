# Monorepo template TypeScript configuration

The `@monorepo-template/tsconfig` package contains production-ready TypeScript
configurations for monorepo packages.

## Install

```sh
yarn add --dev "@monorepo-template/tsconfig" "@types/node"
```

## Use

Change your `tsconfig.json` file to extend this preconfiguration:

```json
{
  "extends": "@monorepo-template/tsconfig"
}
```

### React applications

`tsconfig.json`:

```json
{
  "extends": "@monorepo-template/tsconfig/react-application"
}
```

`tsconfig.development.json`:

```json
{
  "extends": "@monorepo-template/tsconfig/react-application/development"
}
```

`tsconfig.eslint.json`:

```json
{
  "extends": "@monorepo-template/tsconfig/react-application/eslint"
}
```

#### React < 17

```json
{
  "extends": "@monorepo-template/tsconfig/react-application/no-jsx-runtime"
}
```

### React modules

`tsconfig.json`:

```json
{
  "extends": "@monorepo-template/tsconfig/react-module",
  "compilerOptions": {
    "declarationDir": "./dist/types"
  }
}
```

`tsconfig.development.json`:

```json
{
  "extends": "@monorepo-template/tsconfig/react-module/development"
}
```

`tsconfig.eslint.json`:

```json
{
  "extends": "@monorepo-template/tsconfig/react-module/eslint"
}
```

#### React < 17

```json
{
  "extends": "@monorepo-template/tsconfig/react-module/no-jsx-runtime"
}
```
