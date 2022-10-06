import resolveRelative from '../utils/resolve-relative';

const EMPTY_STRING_PATH: string = resolveRelative(
  'modules',
  'empty-string.cjs',
);

export default EMPTY_STRING_PATH;
