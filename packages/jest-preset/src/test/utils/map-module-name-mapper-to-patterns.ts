import mapToRegExp from './map-to-regexp';

export default function mapModuleNameMapperToPatterns(
  moduleNameMapper: Readonly<Record<string, unknown>> | undefined,
): readonly RegExp[] {
  if (typeof moduleNameMapper === 'undefined') {
    return [];
  }
  return Object.keys(moduleNameMapper).map(mapToRegExp);
}
