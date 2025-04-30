import { createPublicClient, http, Chain } from "viem";
import { mainnet } from "viem/chains";

// Default client (optional fallback)
export const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

// Generic client factory
export function getPublicClient(chain: Chain) {
  return createPublicClient({
    chain,
    transport: http(),
  });
}
