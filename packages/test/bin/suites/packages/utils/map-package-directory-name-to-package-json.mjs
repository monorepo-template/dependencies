import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import CWD from '../../../constants/cwd.mjs';
import MISSING_PACKAGE_JSON_FILE_ERROR from '../constants/missing-package-json-file-error.mjs';

export default function mapPackageDirectoryNameToPackageJson(
  packageDirectoryName,
) {
  const path = join(CWD, 'packages', packageDirectoryName, 'package.json');

  if (!existsSync(path)) {
    throw MISSING_PACKAGE_JSON_FILE_ERROR;
  }

  const contents = readFileSync(path, 'utf8');
  return JSON.parse(contents);
}
