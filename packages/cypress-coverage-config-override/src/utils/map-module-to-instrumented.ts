import type { ModuleOptions } from 'webpack';
import MISSING_MODULE_RULES_ERROR from '../constants/missing-module-rules-error';
import mapRulesToInstrumented from './map-rules-to-instrumented';

export default function mapModuleToInstrumented(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  m: Readonly<ModuleOptions>,
): ModuleOptions {
  const { rules } = m;

  if (!Array.isArray(rules)) {
    throw MISSING_MODULE_RULES_ERROR;
  }

  return {
    ...m,
    rules: mapRulesToInstrumented(rules),
  };
}
