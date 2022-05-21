import type { WebpackConfigContext } from 'next/dist/server/config-shared';
import TEST_PLUGINS from '../constants/test-plugins';

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export default function testNextBabelConfig({
  dev,
}: Readonly<WebpackConfigContext>): Record<string, unknown> | undefined {
  if (!dev) {
    return;
  }
  return {
    plugins: TEST_PLUGINS,
  };
}
