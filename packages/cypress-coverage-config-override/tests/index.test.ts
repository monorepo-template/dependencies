import { expect } from '@jest/globals';
import cypressCoverageConfigOverride from '..';
import ABSOLUTE_TSCONFIG_PATH from './constants/absolute-tsconfig-path';
import BABEL_PLUGIN_ISTANBUL_PATH from './constants/babel-plugin-istanbul-path';
import MISSING_ONE_OF_BABEL_RULE_ERROR from './constants/missing-one-of-babel-rule-error';

describe('cypressCoverageConfigOverride', (): void => {
  it('should throw an error if a oneOf Babel rule does not exist', (): void => {
    expect((): void => {
      cypressCoverageConfigOverride({
        plugins: [],
        module: {
          rules: [],
        },
      });
    }).toThrowError(MISSING_ONE_OF_BABEL_RULE_ERROR);
  });

  it('should apply Cypress coverage to the Webpack config', (): void => {
    expect(
      cypressCoverageConfigOverride({
        module: {
          rules: [
            {
              oneOf: [
                {
                  loader: 'babel-loader',
                  options: {
                    plugins: [],
                  },
                },
              ],
            },
          ],
        },
        plugins: [
          {
            options: {},
          },
          {
            options: {
              tsconfig: '',
            },
            tsconfig: '',
          },
        ],
      }),
    ).toStrictEqual({
      module: {
        rules: [
          {
            oneOf: [
              {
                loader: 'babel-loader',
                options: {
                  plugins: [BABEL_PLUGIN_ISTANBUL_PATH],
                },
              },
            ],
          },
        ],
      },
      plugins: [
        {
          options: {},
        },
        {
          tsconfig: ABSOLUTE_TSCONFIG_PATH,
          options: {
            tsconfig: ABSOLUTE_TSCONFIG_PATH,
          },
        },
      ],
    });
  });
});
