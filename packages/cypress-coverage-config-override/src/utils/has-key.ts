export default function hasKey<K extends string, T extends object>(
  value: T,
  key: K,
): value is Record<K, unknown> & T {
  return Object.prototype.hasOwnProperty.call(value, key);
}
