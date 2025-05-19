import { createPublicClient, http, Chain, fallback, PublicClient } from "viem";
import { mainnet } from "viem/chains";

export const mainnetClient: PublicClient = createPublicClient({
  chain: mainnet,
  transport: fallback([
    http('https://eth.merkle.io'), // default
    http('https://eth.llamarpc.com'),
    http('https://eth.drpc.org'),
    http('https://ethereum-rpc.publicnode.com'),
    http('https://1rpc.io/eth'),
    http('https://rpc.mevblocker.io'),
    http('https://rpc.flashbots.net'),
    http('https://eth-pokt.nodies.app'),
    http('https://eth.meowrpc.com'),
    http('https://eth.blockrazor.xyz'),
    http('https://rpc.therpc.io/ethereum'),
  ])
});

export function getPublicClient(chain: Chain) {
  return createPublicClient({
    chain,
    transport: http(),
  });
}
