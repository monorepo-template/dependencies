export default function handleStdErrData(chunk: Buffer | string): void {
  console.error(chunk.toString());
}
