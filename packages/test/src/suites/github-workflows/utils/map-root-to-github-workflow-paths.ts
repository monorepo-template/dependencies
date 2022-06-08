import { resolve } from 'path';
import mapRootToGitHubWorkflowFileNames from './map-root-to-github-workflow-file-names';

export default function mapRootToGitHubWorkflowPaths(
  root: string,
): readonly string[] {
  const fileNames: readonly string[] = mapRootToGitHubWorkflowFileNames(root);

  const mapFileNameToPath = (fileName: string): string => {
    return resolve(root, '.github', 'workflows', fileName);
  };

  return fileNames.map(mapFileNameToPath);
}
