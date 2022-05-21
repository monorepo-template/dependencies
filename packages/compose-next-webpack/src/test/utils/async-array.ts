export default async function asyncArray(): Promise<never[]> {
  return Promise.resolve([]);
}
