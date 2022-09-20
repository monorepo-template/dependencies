import mapToRegExp from './map-to-regexp';

export default function mapModuleNameMapperToPatterns(
  moduleNameMapper: Readonly<Record<string, string>>,
): readonly RegExp[] {
  return Object.keys(moduleNameMapper).map(mapToRegExp);
}
