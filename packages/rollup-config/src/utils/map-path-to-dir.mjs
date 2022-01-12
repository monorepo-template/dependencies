import { parse } from 'path';

export default function mapPathToDir(path) {
  return parse(path).dir;
}
