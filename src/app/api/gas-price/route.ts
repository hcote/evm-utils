import { client } from '@/utils/viemPublicClient';
import { NextResponse } from 'next/server';
import { formatUnits } from "viem";


export async function GET() {
  const gasPrice = await client.getGasPrice(); // returns BigInt in wei
  const gasPriceGwei = Number(formatUnits(BigInt(gasPrice), 9));

  return new NextResponse(
    JSON.stringify({ gasPrice: `${gasPriceGwei.toFixed(1)}` }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=30, stale-while-revalidate=15',
      },
    }
  );
}
