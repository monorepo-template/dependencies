import LOGGER from '../../constants/logger.mjs';
import testSearchExclude from '../../suites/vscode-settings-search-exclude/vscode-settings-search-exclude.mjs';
import getSettingsJson from './utils/get-settings-json.mjs';

const testVSCodeSettingsJson = settingsJson => {
  testSearchExclude(settingsJson);
};

// Loading `.vscode/settings.json` may throw an error, so handle it before
//   testing the rest of the settings.
export default function testVSCodeSettingsJsonEntry() {
  LOGGER.addItem('settings.json');
  LOGGER.indent();

  try {
    const settingsJson = getSettingsJson();
    testVSCodeSettingsJson(settingsJson);
  } catch (err) {
    LOGGER.addError(err);
  }

  LOGGER.unindent();
}
