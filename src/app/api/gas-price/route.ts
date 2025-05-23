import { mainnetClient } from '@/utils/viemPublicClient';
import { NextResponse } from 'next/server';
import { formatUnits } from "viem";

export async function GET() {
  const gasPrice = await mainnetClient.getGasPrice();
  const gasPriceGwei = Number(formatUnits(BigInt(gasPrice), 9));

  return new NextResponse(
    JSON.stringify({ gasPrice: `${gasPriceGwei.toFixed(1)}` }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=300, stale-while-revalidate=30' // 5 minutes
      },
    }
  );
}
