export function resolveIPFS(uri: string): string {
  return uri.startsWith("ipfs://")
    ? `https://ipfs.io/ipfs/${uri.replace("ipfs://", "")}`
    : uri;
}
