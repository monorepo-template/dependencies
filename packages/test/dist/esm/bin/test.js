import TreeLogger from '@monorepo-template/tree-logger';
import { G as GitHubWorkflowsTest, P as PackagesTest, V as VSCodeTest } from '../vscode-78f72b8f.js';
import 'fs';
import 'path';
import 'js-yaml';

new TreeLogger('Testing the monorepo')
    .scope('GitHub workflows', new GitHubWorkflowsTest().test)
    .scope('Packages', new PackagesTest().test)
    .scope('VSCode', new VSCodeTest().test)
    .log();
