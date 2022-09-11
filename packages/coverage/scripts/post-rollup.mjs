import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const packageJsonPath = join(process.cwd(), 'package.json');

const { bin } = readFileSync(packageJsonPath);

for (const relativePath of Object.values(bin)) {
  const absolutePath = join(process.cwd(), relativePath);
  const contents = readFileSync(absolutePath);
  writeFileSync(
    absolutePath,
    `#!/usr/bin/env node

${contents}`,
  );
}
