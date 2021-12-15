# Change scope

The `@monorepo-template/change-scope` package lets you change the scope of a
package.

For example:

- `change-scope` would become `@CharlesStover/change-scope`.
- `@monorepo-template/change-scope` would become
  `@CharlesStover/monorepo-template-change-scope`.

## Use

### Command line

Use the `monorepo-template-change-scope` command to change the scope of the
package in the current working directory to be the `REPOSITORY_OWNER`
environment variable.

### Module

To change the scope of a package manually, you may import this module into a
custom Node script.

```js
import changeScope from '@monorepo-template/change-scope';

// Changes the scope of the package at `packages/path-name/package.json` to
//   `@new-scope/`.
changeScope('packages/path-name', 'new-scope');
```

## Problems

When trying to publish a package after changing its name, Yarn throws
[the following error](https://github.com/CharlesStover/monorepo-template/runs/4527677150?check_suite_focus=true#step:7:9):

```
Internal Error: Assertion failed: Expected workspace @CharlesStover/monorepo-template-change-scope (/home/runner/work/monorepo-template/monorepo-template/packages/change-scope/package.json) to have been resolved. Run "yarn install" to update the lockfile
```

When running `yarn install` to update the lockfile, Yarn throws
[the following error](https://github.com/CharlesStover/monorepo-template/runs/4527564087?check_suite_focus=true#step:6:16),
due to all other packages in the monorepo referencing the old package name:

```
Error: @monorepo-template/module@workspace:^: Workspace not found (@monorepo-template/module@workspace:^)
```
