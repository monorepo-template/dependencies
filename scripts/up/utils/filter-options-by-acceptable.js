import filterOptionsByKeepWorkspaceDependency from './filter-options-by-keep-workspace-dependency.js';
import filterOptionsByUseResolvedFromLatest from './filter-options-by-use-resolved-from-latest.js';

/*
Acceptable options:
- Keep workspace dependencies.
- Use latest dependencies.
*/

export default function filterOptionsByAcceptable(option) {
  return (
    // Select to keep workspace dependencies.
    filterOptionsByKeepWorkspaceDependency(option) ||
    // Select to upgrade dependencies to latest.
    filterOptionsByUseResolvedFromLatest(option)
  );
}
