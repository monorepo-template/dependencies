# `yarn up` skip workspace

The `yarn-up-skip-workspace` command is identical to `yarn up`, except workspace
dependencies are kept.

This command works by calling `yarn up --interactive`, and automatically
selecting options from the resulting prompt:

- Keep workspace dependencies.
- Resolve other dependencies to latest.

## Install

```sh
yarn add --dev yarn-up-skip-workspace
```

## Use

### Command line

Use the `yarn-up-skip-workspace` command to execute and auto-select
`yarn up --interactive "*" "@*/*"`.

```sh
yarn-up-skip-workspace
```

You can specify dependency globs as additional parameters (the default globs are
`"*" "@*/*"`).

```sh
# Upgrade all "@org/" dependencies.
yarn-up-skip-workspace "@org/*"

# Default behavior (upgrade all dependencies)
yarn-up-skip-workspace "*" "@*/*"
```

### Node

You can manually invoke `yarn-up-skip-workspace` by importing it as a Node
module. It returns a `Promise<unknown>`.

```js
import yarnUpSkipWorkspace from 'yarn-up-skip-workspace';
await yarnUpSkipWorkspace('"*"', '"@*/*"');
```
