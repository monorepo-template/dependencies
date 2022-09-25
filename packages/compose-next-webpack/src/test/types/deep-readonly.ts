// We need a type alias here, because we are looping over keys. We need the
//   `Function` type here, because we are deliberately including all functions,
//   as opposed to loosely typing our own function.
// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-type-alias
type DeepReadonly<T> = T extends object
  ? {
      readonly [K in keyof T]: DeepReadonly<T[K]>;
    }
  : T;

export default DeepReadonly;
