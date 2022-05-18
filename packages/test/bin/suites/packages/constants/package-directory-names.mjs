import CWD from '../../../constants/cwd.mjs';
import mapPathToPackageDirectoryNames from '../utils/map-path-to-package-directory-names.mjs';

const PACKAGE_DIRECTORY_NAMES = mapPathToPackageDirectoryNames(CWD);

export default PACKAGE_DIRECTORY_NAMES;
