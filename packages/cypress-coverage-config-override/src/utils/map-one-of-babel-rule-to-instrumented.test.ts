/// <reference types="jest" />
import MISSING_BABEL_LOADER_ERROR from '../constants/missing-babel-loader-error';
import mapOneOfBabelRuleToInstrumented from './map-one-of-babel-rule-to-instrumented';

describe('mapOneOfBabelRuleToInstrumented', (): void => {
  it('should throw an error if a oneOf Babel rule does not exist', (): void => {
    expect((): void => {
      mapOneOfBabelRuleToInstrumented({
        oneOf: [],
      });
    }).toThrowError(MISSING_BABEL_LOADER_ERROR);
  });
});
