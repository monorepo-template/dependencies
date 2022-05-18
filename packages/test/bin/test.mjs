import LOGGER from './constants/logger.mjs';
import testGitHubWorkflows from './suites/github-workflows/index.mjs';
import testPackages from './suites/packages/index.mjs';
import testVSCode from './suites/vscode/index.mjs';

testGitHubWorkflows();
testPackages();
testVSCode();

LOGGER.log();
