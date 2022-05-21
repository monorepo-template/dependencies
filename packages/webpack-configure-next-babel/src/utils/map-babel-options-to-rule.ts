import type { RuleSetRule } from 'webpack';
import ALL_FILES_REGEXP from '../constants/all-files-test';

// Override all files with these Babel options.
export default function mapBabelOptionsToRule(
  babelOptions: Readonly<Record<string, unknown>>,
): RuleSetRule {
  return {
    test: ALL_FILES_REGEXP,
    ...babelOptions,
  };
}
