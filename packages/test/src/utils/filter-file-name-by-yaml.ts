import YAML_FILENAME from '../constants/yaml-filename';

export default function filterFileNameByYaml(fileName: string): boolean {
  return YAML_FILENAME.test(fileName);
}
