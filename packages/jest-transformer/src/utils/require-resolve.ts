import require from './require';

export default function requireResolve(path: string): string {
  return require.resolve(path);
}
