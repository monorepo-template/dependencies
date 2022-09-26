import { readFileSync } from 'fs';
import { join } from 'path';
import CWD from '../constants/cwd';
import type PackageJson from '../types/package-json';
import validatePackageJson from './validate-package-json';

export default function getPackageJson(): PackageJson {
  const path: string = join(CWD, 'package.json');
  const contents: string = readFileSync(path, 'utf8');
  const value: unknown = JSON.parse(contents);
  return validatePackageJson(value);
}
