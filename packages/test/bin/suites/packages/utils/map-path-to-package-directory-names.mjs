import { readdirSync } from 'fs';
import { join } from 'path';
import MISSING_PACKAGES_DIRECTORY_ERROR from '../constants/missing-packages-directory-error.mjs';

export default function mapPathToPackageDirectoryNames(path) {
  if (!readdirSync(path).includes('packages')) {
    throw MISSING_PACKAGES_DIRECTORY_ERROR;
  }

  const absolutePath = join(path, 'packages');
  const directoryNames = readdirSync(absolutePath);
  return directoryNames;
}
