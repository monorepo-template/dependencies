export default interface PackageJson {
  readonly dependencies?: Readonly<Record<string, string>> | undefined;
  readonly peerDependencies?: Readonly<Record<string, string>> | undefined;
}
