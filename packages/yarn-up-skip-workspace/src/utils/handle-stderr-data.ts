export default function handleStdErrData(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  chunk: Readonly<Buffer> | string,
): void {
  console.error(chunk.toString());
}
