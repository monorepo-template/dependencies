import LOGGER from '../../constants/logger.mjs';
import testVSCodeSettingsJson from '../../suites/vscode-settings-json/index.mjs';

export default function testVSCode() {
  LOGGER.addItem('VSCode');

  LOGGER.indent();
  testVSCodeSettingsJson();
  LOGGER.unindent();
}
