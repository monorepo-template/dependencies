import require from '../utils/require.mjs';

export default function requireResolve(path) {
  return require.resolve(path);
}
