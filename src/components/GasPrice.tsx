"use client";

import { useGasPrice } from "@/hooks/use-gas-price";
import IcoGas from "../icons/IcoGas";

export default function GasPrice() {
  const { data: gasPrice } = useGasPrice();

  const getTextColor = (priceStr: string) => {
    const price = Number(priceStr);
    if (!priceStr || isNaN(price)) return "text-white";
    if (price < 10) return "text-green-200";
    if (price <= 40) return "text-yellow-200";
    return "text-red-200";
  };

  const colorClass = gasPrice ? getTextColor(gasPrice) : "text-white";

  return gasPrice ? (
    <div className={`flex gap-2 items-center ${colorClass}`}>
      <IcoGas size={16} color="currentColor" />
      <span>{gasPrice} gwei</span>
    </div>
  ) : null;
}

/**
WITH TOOLTIP

"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { useGasPrice } from "@/hooks/use-gas-price";
import IcoGas from "../icons/Gas";

export default function GasPrice() {
  const { data: gasPrice } = useGasPrice();

  const getTextColor = (priceStr: string) => {
    const price = Number(priceStr);
    if (!priceStr || isNaN(price)) return "text-white";
    if (price < 10) return "text-green-200";
    if (price <= 40) return "text-yellow-200";
    return "text-red-200";
  };

  const colorClass = gasPrice ? getTextColor(gasPrice) : "text-white";

  return gasPrice ? (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div
            className={`flex gap-2 items-center cursor-default ${colorClass}`}
          >
            <IcoGas size={16} color="currentColor" />
            <span>{gasPrice} gwei</span>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content
          className="bg-gray-900 text-white text-sm px-2 py-1 rounded shadow z-50"
          side="top"
          sideOffset={4}
        >
          Current gas price
          <Tooltip.Arrow className="fill-gray-900" />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  ) : null;
}
 */
