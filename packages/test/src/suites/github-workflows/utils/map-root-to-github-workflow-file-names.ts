import { readdirSync } from 'fs';
import { join } from 'path';
import filterFileNameByYaml from '../../../utils/filter-file-name-by-yaml';
import MISSING_GITHUB_DIRECTORY_ERROR from '../constants/missing-github-directory-error';
import MISSING_GITHUB_WORKFLOWS_DIRECTORY_ERROR from '../constants/missing-github-workflows-directory-error';

export default function mapRootToGitHubWorkflowFileNames(
  root: string,
): readonly string[] {
  if (!readdirSync(root).includes('.github')) {
    throw MISSING_GITHUB_DIRECTORY_ERROR;
  }

  const gitHubPath: string = join(root, '.github');
  const gitHubFileNames: readonly string[] = readdirSync(gitHubPath);
  if (!gitHubFileNames.includes('workflows')) {
    throw MISSING_GITHUB_WORKFLOWS_DIRECTORY_ERROR;
  }

  const gitHubWorkflowsPath: string = join(gitHubPath, 'workflows');
  return readdirSync(gitHubWorkflowsPath).filter(filterFileNameByYaml);
}
