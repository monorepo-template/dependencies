// Unlike the default output directory, the default temporary directory is
//   prefixed with `./`.
// https://github.com/istanbuljs/nyc/blob/ab7c53b2f340b458789a746dff2abd3e2e4790c3/index.js#L46
const DEFAULT_TEMPORARY_DIRECTORY = './.nyc_output';

export default DEFAULT_TEMPORARY_DIRECTORY;
