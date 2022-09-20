import { createRequire } from 'module';

const require: NodeRequire = createRequire(import.meta.url);

export default require;
