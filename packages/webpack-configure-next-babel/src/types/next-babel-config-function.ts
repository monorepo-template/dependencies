import type { WebpackConfigContext } from 'next/dist/server/config-shared';

// eslint-disable-next-line @typescript-eslint/no-type-alias
type NextBabelConfigFunction = (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  webpackConfigContext: Readonly<WebpackConfigContext>,
) => Record<string, unknown> | undefined;

export default NextBabelConfigFunction;
