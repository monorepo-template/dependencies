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
  "extends": "@monorepo-template/tsconfig/react-application.json"
}
```

`tsconfig.development.json`:

```json
{
  "extends": "@monorepo-template/tsconfig/react-application/development.json"
}
```

`tsconfig.eslint.json`:

```json
{
  "extends": "@monorepo-template/tsconfig/react-application/eslint.json"
}
```

#### React < 17

```json
{
  "extends": "@monorepo-template/tsconfig/react-application/no-jsx-runtime.json"
}
```

### React modules

`tsconfig.json`:

```json
{
  "extends": "@monorepo-template/tsconfig/react-module.json",
  "compilerOptions": {
    "declarationDir": "./dist/types"
  }
}
```

`tsconfig.development.json`:

```json
{
  "extends": "@monorepo-template/tsconfig/react-module/development.json"
}
```

`tsconfig.eslint.json`:

```json
{
  "extends": "@monorepo-template/tsconfig/react-module/eslint.json"
}
```

#### React < 17

```json
{
  "extends": "@monorepo-template/tsconfig/react-module/no-jsx-runtime.json"
}
```
