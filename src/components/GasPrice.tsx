"use client";

import { useGasPrice } from "@/hooks/use-gas-price";
import IcoGas from "../icons/IcoGas";

export default function GasPrice() {
  const { data: gasPrice } = useGasPrice();

  const getTextColor = (priceStr: string) => {
    const price = Number(priceStr);
    if (!priceStr || isNaN(price)) return "text-white";
    if (price < 10) return "text-[#9ee3b7]";
    if (price <= 40) return "text-yellow-200";
    return "text-red-200";
  };

  const colorClass = gasPrice ? getTextColor(gasPrice) : "text-white";

  return gasPrice ? (
    <div className={`flex gap-2 items-center ${colorClass}`}>
      <div className="shrink-0">
        <IcoGas size={16} color="currentColor" />
      </div>
      <span>{gasPrice} gwei</span>
    </div>
  ) : null;
}
