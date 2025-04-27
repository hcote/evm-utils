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
    defaultValues: { wei: "", gwei: "", eth: "" },
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

      if (field === "wei") {
        wei = BigInt(sanitized.replace(/\..*$/, ""));
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
    <div className="px-10 py-8 space-y-5 bg-[var(--color-bg)] text-[var(--color-text-primary)] max-w-md mx-auto rounded-2xl shadow-lg border border-[var(--color-surface)]">
      {(["wei", "gwei", "eth"] as const).map((field) => (
        <div className="space-y-2" key={field}>
          <label
            htmlFor={field}
            className={`block capitalize text-sm transition-opacity duration-200 ${
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
                className="w-full p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-text-secondary)] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[#aaa5a5]"
                onChange={(e) => {
                  const rawVal = e.target.value;
                  const sanitizedVal = sanitizeInput(rawVal);
                  controllerField.onChange(sanitizedVal);
                  handleUpdate(field, sanitizedVal);
                }}
              />
            )}
          />
        </div>
      ))}
      <div className="pt-2">
        <p className="text-sm text-[var(--color-text-secondary)]">
          ≈{" "}
          {values.eth && priceUSD
            ? (() => {
                const price = parseFloat(values.eth) * parseFloat(priceUSD);
                return price < 0.01
                  ? "<$0.01"
                  : `$${formatUSD(price.toFixed(2))}`;
              })()
            : "$0.00"}
        </p>
      </div>
    </div>
  );
}
