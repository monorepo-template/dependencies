const { prepend } = require('rollup-plugin-insert');

const NO_JSX_RUNTIME_PLUGIN = prepend("import React from 'react';\n", {
  include: '**/*.tsx',
});

module.exports = NO_JSX_RUNTIME_PLUGIN;
