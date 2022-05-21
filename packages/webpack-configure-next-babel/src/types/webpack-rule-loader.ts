export default interface WebpackRuleLoader {
  readonly ident?: string;
  readonly loader?: string;
  readonly options?: Record<string, unknown> | string;
}
