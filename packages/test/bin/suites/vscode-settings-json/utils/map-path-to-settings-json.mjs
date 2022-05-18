import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import MISSING_SETTINGS_JSON_FILE from '../constants/missing-settings-json.mjs';

export default function mapPathToSettingsJson(path) {
  const fileName = join(path, '.vscode', 'settings.json');

  if (!existsSync(fileName)) {
    throw MISSING_SETTINGS_JSON_FILE;
  }

  const contents = readFileSync(fileName, 'utf8');
  const json = JSON.parse(contents);
  return json;
}
