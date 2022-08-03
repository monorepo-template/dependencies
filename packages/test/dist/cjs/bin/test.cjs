'use strict';

var TreeLogger = require('@monorepo-template/tree-logger');
var vscode = require('../vscode-47794e14.cjs');
require('fs');
require('path');
require('js-yaml');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var TreeLogger__default = /*#__PURE__*/_interopDefaultLegacy(TreeLogger);

new TreeLogger__default["default"]('Testing the monorepo')
    .scope('GitHub workflows', new vscode.GitHubWorkflowsTest().test)
    .scope('Packages', new vscode.PackagesTest().test)
    .scope('VSCode', new vscode.VSCodeTest().test)
    .log();
