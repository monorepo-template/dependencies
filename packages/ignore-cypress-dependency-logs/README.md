# Ignore Cypress dependency logs

The `ignoreCypressDependencyLogs` module creates a Cypress `beforeEach` hook to
ignore logs emit by third-party dependencies.

## Install

```sh
yarn add --dev "@monorepo-template/ignore-cypress-dependency-logs"
```

## Use

In your Cypress support file, typically `cypress/support/e2e.ts`, import and
execute the `ignoreCypressDependencyLogs` function.

```js
import ignoreCypressDependencyLogs from '@monorepo-template/ignore-cypress-dependency-logs';

beforeEach(
  ignoreCypressDependencyLogs([
    'https://cloudflareinsights.com/', // ignore Cloudflare
    'https://o592283.ingest.sentry.io/', // ignore Sentry
    'https://rum.browser-intake-datadoghq.com/', // ignore Datadog
    'https://session-replay.browser-intake-datadoghq.com/', // ignore Datadog
  ]),
);
```
