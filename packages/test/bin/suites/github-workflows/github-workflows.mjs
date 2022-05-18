import LOGGER from '../../constants/logger.mjs';
import mapPathToPackageJson from '../../utils/map-path-to-package-json.mjs';
import EXPECTED_ON_TYPE_ERROR from './constants/expected-on-type-error.mjs';
import GITHUB_WORKFLOW_FILE_NAMES from './constants/github-workflow-file-names.mjs';
import mapGitHubWorkflowFileNameToJson from './utils/map-github-workflow-file-name-to-json.mjs';
import mapPathToWorkspace from './utils/map-path-to-workspace.mjs';

const YAML_FILE_EXTENSION = /\.yml$/;

const DEPENDENCY_PROPERTIES = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
];

export default function testGitHubWorkflows() {
  LOGGER.addItem('GitHub workflows');

  // GitHub workflow relative paths
  LOGGER.indent();
  for (const gitHubWorkflowFileName of GITHUB_WORKFLOW_FILE_NAMES) {
    const gitHubWorkflowName = gitHubWorkflowFileName.replace(
      YAML_FILE_EXTENSION,
      '',
    );
    const gitHubWorkflowRelativePath = `.github/workflows/${gitHubWorkflowFileName}`;
    const gitHubWorkflowJson = mapGitHubWorkflowFileNameToJson(
      gitHubWorkflowFileName,
    );

    // skip; does not target any events
    if (!Object.prototype.hasOwnProperty.call(gitHubWorkflowJson, 'on')) {
      // LOGGER.addItem(gitHubWorkflowFileName);
      continue;
    }

    LOGGER.addItem(gitHubWorkflowName);

    if (typeof gitHubWorkflowJson.on !== 'object') {
      LOGGER.addError(EXPECTED_ON_TYPE_ERROR);
      continue;
    }

    // GitHub workflow event triggers
    LOGGER.indent();
    for (const [event, sources] of Object.entries(gitHubWorkflowJson.on)) {
      // skip; does not target any paths
      if (
        typeof sources !== 'object' ||
        sources === null ||
        !Object.prototype.hasOwnProperty.call(sources, 'paths')
      ) {
        // LOGGER.addItem(event);
        continue;
      }

      LOGGER.addItem(event);

      if (!Array.isArray(sources.paths)) {
        LOGGER.addError(
          new Error(`Expected \`on.${event}.paths\` to be an array.`),
        );
        continue;
      }

      if (!sources.paths.includes(gitHubWorkflowRelativePath)) {
        LOGGER.addError(
          new Error(
            `Expected \`on.${event}.paths\` to include itself ('${gitHubWorkflowRelativePath}').`,
          ),
        );
        continue;
      }

      // GitHub workflow event trigger paths
      LOGGER.indent();
      const workspacePackageJsons = new Map();
      for (const path of sources.paths) {
        const workspacePath = mapPathToWorkspace(path);

        // skip; not a workspace
        if (typeof workspacePath === 'undefined') {
          // LOGGER.addItem(path);
          continue;
        }

        // skip; already tested
        if (workspacePackageJsons.has(workspacePath)) {
          // LOGGER.addItem(path);
          continue;
        }

        LOGGER.addItem(path.replace(/(?:\/\*\*)?\/\*$/, ''));

        const packageJson = mapPathToPackageJson(workspacePath);
        workspacePackageJsons.set(workspacePath, packageJson);
      }

      const filterWorkspacePackageJsonsByPackageName = packageName => {
        for (const packageJson of workspacePackageJsons.values()) {
          if (packageJson.name === packageName) {
            return true;
          }
        }
        return false;
      };

      for (const [
        workspacePath,
        packageJson,
      ] of workspacePackageJsons.entries()) {
        // Check the workspace's `dependencies` + `devDependencies` +
        //   `peerDependencies` for other workspaces.
        for (const property of DEPENDENCY_PROPERTIES) {
          if (!Object.prototype.hasOwnProperty.call(packageJson, property)) {
            continue;
          }

          // For each dependency, check if it is a workspace package.
          for (const [packageName, packageVersion] of Object.entries(
            packageJson[property],
          )) {
            if (!packageVersion.startsWith('workspace:')) {
              continue;
            }

            if (filterWorkspacePackageJsonsByPackageName(packageName)) {
              continue;
            }

            LOGGER.addError(
              new Error(
                `Expected \`on.${event}.paths\` to include \`${packageName}\`'s workspace path, because it is a dependency of \`${workspacePath}\`.`,
              ),
            );
            continue;
          }
        }
      }

      LOGGER.unindent();
    }

    LOGGER.unindent();
  }

  LOGGER.unindent();
}
