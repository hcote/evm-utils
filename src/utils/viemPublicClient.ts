import { createPublicClient, http, Chain } from "viem";
import { mainnet } from "viem/chains";

export const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export function getPublicClient(chain: Chain) {
  return createPublicClient({
    chain,
    transport: http(),
  });
}
