import resolveRelative from '../utils/resolve-relative.mjs';

const EMPTY_STRING_PATH = resolveRelative(
  'src',
  'constants',
  'empty-string.ts',
);

export default EMPTY_STRING_PATH;
