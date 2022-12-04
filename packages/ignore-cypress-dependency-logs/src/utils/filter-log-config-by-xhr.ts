/// <reference types="cypress" />
import type XhrConsoleProps from '../types/xhr-console-props';

interface XhrLogConfig extends Cypress.LogConfig {
  readonly consoleProps: () => XhrConsoleProps;
}

export default function filterLogConfigByXhr(
  options: Partial<Readonly<Cypress.LogConfig>>,
): options is XhrLogConfig {
  return (
    options.displayName === 'xhr' && typeof options.consoleProps === 'function'
  );
}
