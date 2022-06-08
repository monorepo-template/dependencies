import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import validateRecord from './validate-record';

export default function mapYamlPathToJson(
  path: string,
): Record<string, unknown> {
  const yaml: string = readFileSync(path, 'utf8');
  const workflow: unknown = load(yaml);
  return validateRecord(workflow);
}
