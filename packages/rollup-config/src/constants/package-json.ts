import type PackageJson from '../types/package-json';
import getPackageJson from '../utils/get-package-json';

const PACKAGE_JSON: PackageJson = getPackageJson();

export default PACKAGE_JSON;
