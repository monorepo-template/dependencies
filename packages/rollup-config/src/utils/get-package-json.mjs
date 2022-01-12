import { readFileSync } from 'fs';
import { join } from 'path';

export default function getPackageJson() {
  const path = join(process.cwd(), 'package.json');
  const str = readFileSync(path, 'utf8');
  return JSON.parse(str);
}
