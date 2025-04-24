"use client";

import { useEthPrice } from "@/hooks/use-eth-price";
import { formatUSD } from "@/utils/formatUSD";
import { JSX, useRef } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { parseUnits, formatUnits } from "viem";

interface FormValues {
  wei: string;
  gwei: string;
  eth: string;
}

const sanitizeInput = (value: string): string => {
  return value.replace(/[^0-9.]/g, "");
};

export default function Page(): JSX.Element {
  const { data: priceUSD } = useEthPrice();
  const { control, getValues, setValue } = useForm<FormValues>({
    defaultValues: {
      wei: "",
      gwei: "",
      eth: "",
    },
  });

  const values = useWatch({ control });
  const lastChangedField = useRef<keyof FormValues | null>(null);

  const handleUpdate = (field: keyof FormValues, input: string) => {
    lastChangedField.current = field;

    const sanitized = sanitizeInput(input);
    if (!sanitized) {
      setValue("wei", "");
      setValue("gwei", "");
      setValue("eth", "");
      return;
    }

    try {
      let wei: bigint;

      // Use parseUnits properly with decimal strings
      if (field === "wei") {
        // Only whole numbers allowed here
        wei = BigInt(sanitized.replace(/\..*$/, "")); // Remove decimal part if present
      } else if (field === "gwei") {
        wei = parseUnits(sanitized, 9);
      } else {
        wei = parseUnits(sanitized, 18);
      }

      if (field !== "wei") {
        const current = getValues("wei");
        const newValue = wei.toString();
        if (current !== newValue)
          setValue("wei", newValue, { shouldDirty: false });
      }

      if (field !== "gwei") {
        const current = getValues("gwei");
        const newValue = formatUnits(wei, 9);
        if (current !== newValue)
          setValue("gwei", newValue, { shouldDirty: false });
      }

      if (field !== "eth") {
        const current = getValues("eth");
        const newValue = formatUnits(wei, 18);
        if (current !== newValue)
          setValue("eth", newValue, { shouldDirty: false });
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  return (
    <div className="p-4 space-y-4 bg-gray-900 text-white max-w-md mx-auto rounded-xl shadow">
      <h2 className="text-xl font-semibold text-center">ETH Unit Converter</h2>

      {(["wei", "gwei", "eth"] as const).map((field) => (
        <div className="space-y-1" key={field}>
          <label
            htmlFor={field}
            className={`block capitalize h-5 ${
              values[field] ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            {field}
          </label>
          <Controller
            name={field}
            control={control}
            render={({ field: controllerField }) => (
              <input
                {...controllerField}
                id={field}
                inputMode="decimal"
                placeholder={field}
                className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-700 focus:outline-none"
                onChange={(e) => {
                  const val = e.target.value;
                  controllerField.onChange(val);
                  handleUpdate(field, val);
                }}
              />
            )}
          />
        </div>
      ))}
      <div>
        <p className="text-sm text-gray-400">
          ≈{" "}
          {values.eth && priceUSD
            ? `$${formatUSD(
                (parseFloat(values.eth) * parseFloat(priceUSD)).toFixed(2)
              )}`
            : "$0.00"}
        </p>
      </div>
    </div>
  );
}
