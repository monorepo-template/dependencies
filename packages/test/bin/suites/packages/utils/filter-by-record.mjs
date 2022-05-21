export default function filterByRecord(value) {
  return typeof value === 'object' && value !== null;
}
