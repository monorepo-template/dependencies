// eslint-disable-next-line @typescript-eslint/no-type-alias
type Defined<T> = T extends infer U | undefined ? U : never;

export default Defined;
