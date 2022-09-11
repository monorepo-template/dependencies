import { resolve } from 'path';

export default function mapRelativePathToAbsolutePath(path: string): string {
  return resolve(path);
}
