"use client";

import { useEthPrice } from "@/hooks/use-eth-price";
import IcoEthereum from "@/icons/IcoEthereum";
import { formatUSD } from "@/utils/formatUSD";

export default function EthPrice() {
  const { data: priceUSD } = useEthPrice();

  return priceUSD ? (
    <div className="flex gap-1 items-center text-[#aaa5a5]">
      <IcoEthereum size={20} />${formatUSD(priceUSD)}
    </div>
  ) : null;
}
