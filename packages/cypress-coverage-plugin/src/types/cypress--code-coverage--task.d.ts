/// <reference types="cypress" />

declare module '@cypress/code-coverage/task' {
  export default function registerCodeCoverageTasks(
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions,
  ): Cypress.PluginConfigOptions;
}
