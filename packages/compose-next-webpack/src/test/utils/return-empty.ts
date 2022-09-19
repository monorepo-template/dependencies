const EMPTY: Readonly<Record<string, never>> = Object.freeze({});

export default function returnEmpty(): Readonly<Record<string, never>> {
  return EMPTY;
}
