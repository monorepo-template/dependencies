import LOGGER from './constants/logger.mjs';
import testGitHubWorkflows from './suites/github-workflows/index.mjs';

testGitHubWorkflows();

LOGGER.log();
