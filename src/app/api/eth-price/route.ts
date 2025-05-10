import { chainlinkPriceFeedAbi } from '@/abis/chainlink';
import { CHAINLINK_ETH_USD_FEED } from '@/constants/addresses';
import { client } from '@/utils/viemPublicClient';
import { NextResponse } from 'next/server';
import { formatUnits } from 'viem';

export async function GET() {
  const result = await client.readContract({
    address: CHAINLINK_ETH_USD_FEED,
    abi: chainlinkPriceFeedAbi,
    functionName: 'latestRoundData',
  });

  const rawPrice = (result as bigint[])[1];
  const price = formatUnits(rawPrice, 8);

  return new NextResponse(
    JSON.stringify({ price: `${Number(price).toFixed(2)}` }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=60', // 1 hour
      },
    }
  );
}

