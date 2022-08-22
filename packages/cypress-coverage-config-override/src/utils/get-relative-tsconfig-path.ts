export default function getRelativeTSConfigPath(): string {
  const { CYPRESS_TSCONFIG_PATH } = process.env;

  if (
    typeof CYPRESS_TSCONFIG_PATH === 'string' &&
    CYPRESS_TSCONFIG_PATH !== ''
  ) {
    return CYPRESS_TSCONFIG_PATH;
  }

  return './cypress/tsconfig.json';
}
