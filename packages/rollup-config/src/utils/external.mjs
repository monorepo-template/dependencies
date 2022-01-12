import EXTERNAL_DEPENDENCIES_SET from '../constants/external-dependencies-set.mjs';

export default function external(id) {
  if (EXTERNAL_DEPENDENCIES_SET.has(id)) {
    return true;
  }

  for (const pkg of EXTERNAL_DEPENDENCIES_SET) {
    if (id.startsWith(`${pkg}/`)) {
      return true;
    }
  }

  return false;
}
