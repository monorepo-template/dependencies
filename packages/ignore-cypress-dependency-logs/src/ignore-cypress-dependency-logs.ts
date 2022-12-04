/// <reference types="cypress" />
import type XhrConsoleProps from './types/xhr-console-props';
import filterLogConfigByFetch from './utils/filter-log-config-by-fetch';
import filterLogConfigByXhr from './utils/filter-log-config-by-xhr';

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const Cypress: CyEventEmitter & Cypress.Cypress & CypressLog;

interface CypressLog {
  log: (
    options: Partial<Readonly<Cypress.LogConfig>>,
  ) => Cypress.Log | undefined;
}

const cypressLog = Cypress.log;

export default function cypressIgnoreDependencyLogs(
  locations: readonly string[],
): void {
  function log(options: Partial<Readonly<Cypress.LogConfig>>): Cypress.Log;
  function log(
    options: Partial<Readonly<Cypress.LogConfig>>,
  ): Cypress.Log | undefined {
    // Fetch logs
    if (filterLogConfigByFetch(options)) {
      const filterByUrl = (location: string): boolean =>
        options.url.includes(location);
      if (locations.some(filterByUrl)) {
        return;
      }
      return cypressLog(options);
    }

    // XHR logs
    if (filterLogConfigByXhr(options)) {
      const consoleProps: XhrConsoleProps = options.consoleProps();
      const filterByUrl = (location: string): boolean =>
        consoleProps.URL.includes(location);
      if (locations.some(filterByUrl)) {
        return;
      }
      return cypressLog(options);
    }

    // All other logs
    return cypressLog(options);
  }

  Cypress.log = log;
}
