import { prepend } from 'rollup-plugin-insert';

const NO_JSX_RUNTIME_PLUGIN = prepend("import React from 'react';\n", {
  include: '**/*.tsx',
});

export default NO_JSX_RUNTIME_PLUGIN;
