import CWD from '../../../constants/cwd.mjs';
import mapPathToSettingsJson from '../utils/map-path-to-settings-json.mjs';

export default function getSettingsJson() {
  return mapPathToSettingsJson(CWD);
}
