import type { WebpackConfigContext } from 'next/dist/server/config-shared';
import type { Configuration, RuleSetRule } from 'webpack';
import NON_BABEL_RULES from './test/constants/non-babel-rules';
import TEST_WEBPACK_CONFIG_CONTEXT from './test/constants/test-webpack-config-context';
import returnUndefined from './test/utils/return-undefined';
import testNextBabelConfig from './test/utils/test-next-babel-config';
import createConfigureNextBabel from '.';
import BABEL_LOADER_PATH from './constants/babel-loader-path';
import MISSING_NEXT_CONFIG_ERROR from './constants/missing-next-config-error';

const configureNextBabel = createConfigureNextBabel(testNextBabelConfig);

const TEST_OVERRIDES: readonly unknown[] = [
  {
    plugins: ['test-plugin'],
    test: /.*/,
  },
];

const TEST_DEV_WEBPACK_CONFIG_CONTEXT: WebpackConfigContext = {
  ...TEST_WEBPACK_CONFIG_CONTEXT,
  dev: true,
};

const TEST_PROD_WEBPACK_CONFIG_CONTEXT: WebpackConfigContext = {
  ...TEST_WEBPACK_CONFIG_CONTEXT,
  dev: false,
};

describe('configureNextBabel', (): void => {
  it('should handle empty Babel configurations', (): void => {
    const TEST_WEBPACK_CONFIG: Configuration = {
      module: {},
    };
    expect(
      createConfigureNextBabel(returnUndefined)(
        TEST_WEBPACK_CONFIG,
        TEST_DEV_WEBPACK_CONFIG_CONTEXT,
      ),
    ).toEqual(TEST_WEBPACK_CONFIG);
  });

  it('should handle empty module options', (): void => {
    expect(configureNextBabel({}, TEST_DEV_WEBPACK_CONFIG_CONTEXT)).toEqual({});
  });

  it('should handle empty rules', (): void => {
    expect(
      configureNextBabel(
        {
          module: {},
        },
        TEST_DEV_WEBPACK_CONFIG_CONTEXT,
      ),
    ).toEqual({
      module: {},
    });
  });

  it('should not mutate irrelevant rules', (): void => {
    const TEST_WEBPACK_CONFIG: Configuration = {
      module: {
        rules: [...NON_BABEL_RULES],
      },
    };
    expect(
      configureNextBabel(TEST_WEBPACK_CONFIG, TEST_DEV_WEBPACK_CONFIG_CONTEXT),
    ).toEqual(TEST_WEBPACK_CONFIG);
  });

  it('should throw an error when the Next SWC loader is missing the Next config object', (): void => {
    expect((): void => {
      configureNextBabel(
        {
          module: {
            rules: [
              {
                use: {
                  loader: 'next-swc-loader',
                  options: {},
                },
              },
            ],
          },
        },
        TEST_DEV_WEBPACK_CONFIG_CONTEXT,
      );
    }).toThrow(MISSING_NEXT_CONFIG_ERROR);
  });

  it('should support dynamic Babel configurations (override branch)', (): void => {
    const TEST_RULES: Map<RuleSetRule, RuleSetRule> = new Map([
      // Babel rule with non-object options
      [
        {
          use: {
            loader: 'next/dist/build/babel/loader',
            options: 'test-options',
          },
        },
        {
          use: {
            loader: 'next/dist/build/babel/loader',
            options: {
              overrides: TEST_OVERRIDES,
            },
          },
        },
      ],

      // Babel rule with non-array overrides
      [
        {
          use: {
            loader: 'next/dist/build/babel/loader',
            options: {
              overrides: 'test-overrides',
            },
          },
        },
        {
          use: {
            loader: 'next/dist/build/babel/loader',
            options: {
              overrides: TEST_OVERRIDES,
            },
          },
        },
      ],

      // Babel loader with overrides
      [
        {
          use: {
            loader: 'next/dist/build/babel/loader',
            options: {
              overrides: ['test-override'],
            },
          },
        },
        {
          use: {
            loader: 'next/dist/build/babel/loader',
            options: {
              overrides: ['test-override', ...TEST_OVERRIDES],
            },
          },
        },
      ],

      // Next SWC rule with no overrides
      [
        {
          use: {
            loader: 'next-swc-loader',
            options: {
              hasReactRefresh: true,
              isServer: true,
              pagesDir: 'test-pages-dir',
              nextConfig: {
                distDir: 'test-dist-dir',
              },
            },
          },
        },
        {
          use: {
            loader: BABEL_LOADER_PATH,
            options: {
              cwd: 'test-dir',
              development: true,
              distDir: 'test-dir/test-dist-dir',
              hasJsxRuntime: true,
              hasReactRefresh: true,
              isServer: true,
              overrides: TEST_OVERRIDES,
              pagesDir: 'test-pages-dir',
            },
          },
        },
      ],
    ]);

    for (const [rule, expectedRule] of TEST_RULES.entries()) {
      expect(
        configureNextBabel(
          {
            module: {
              rules: [rule],
            },
          },
          TEST_DEV_WEBPACK_CONFIG_CONTEXT,
        ),
      ).toEqual({
        module: {
          rules: [expectedRule],
        },
      });
    }
  });

  it('should support dynamic Babel configurations (no-op branch)', (): void => {
    const TEST_WEBPACK_CONFIG: Configuration = {
      module: {
        rules: [
          {
            use: {
              loader: 'next/dist/build/babel/loader',
              options: 'test-options',
            },
          },
        ],
      },
    };
    expect(
      configureNextBabel(TEST_WEBPACK_CONFIG, TEST_PROD_WEBPACK_CONFIG_CONTEXT),
    ).toEqual(TEST_WEBPACK_CONFIG);
  });
});
