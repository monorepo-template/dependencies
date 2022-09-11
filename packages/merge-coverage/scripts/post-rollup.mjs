import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const { bin } = readFileSync(join('..', 'package.json'));

for (const relativeRootPath of Object.values(bin)) {
  const relativeLocalPath = join('..', relativeRootPath);
  const contents = readFileSync(relativeLocalPath);
  writeFileSync(
    relativeLocalPath,
    `#!/usr/bin/env node

${contents}`,
  );
}
