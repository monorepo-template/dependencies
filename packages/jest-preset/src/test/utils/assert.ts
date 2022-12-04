export default function assert(condition: boolean): asserts condition {
  if (!condition) {
    throw new Error(`Expected condition to be true.`);
  }
}
