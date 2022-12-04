# Monorepo template `up`

The `monorepo-template-up` command is analogous to `yarn up`, but on steroids.
It performs the following upgrades:

- Upgrades Yarn to the latest version (and generates its lock file).
- Upgrades Yarn's SDKs.
- Upgrades all dependencies (ignoring workspace dependencies).
- Upgrades all recursive dependencies.

## Install

```sh
yarn add --dev @monorepo-template/up
```

## Use

The upgrade command works best as a script in your `package.json` file:

```sh
{
  "scripts": {
    "up": "monorepo-template-up"
  }
}
```

This script allows you to simply use `yarn run up` to upgrade all dependencies.
