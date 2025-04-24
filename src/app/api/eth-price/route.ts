import { client } from '@/utils/viemPublicClient';
import { NextResponse } from 'next/server';

const ETH_USD_FEED = '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419';
const ABI = [
  {
    name: 'latestRoundData',
    type: 'function',
    stateMutability: 'view',
    outputs: [
      { name: 'roundId', type: 'uint80' },
      { name: 'answer', type: 'int256' },
      { name: 'startedAt', type: 'uint256' },
      { name: 'updatedAt', type: 'uint256' },
      { name: 'answeredInRound', type: 'uint80' },
    ],
    inputs: [],
  },
];

export async function GET() {
  const result = await client.readContract({
    address: ETH_USD_FEED,
    abi: ABI,
    functionName: 'latestRoundData',
  });

  const price = Number((result as bigint[])[1]) / 1e8;

  return new NextResponse(
    JSON.stringify({ price: `${price.toFixed(2)}` }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=60, stale-while-revalidate=30',
      },
    }
  );
}
