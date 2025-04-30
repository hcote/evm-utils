"use client";

import { useState } from "react";
import Container from "@/ui/Container";
import TextInput from "@/ui/TextInput";
import { useEthPrice } from "@/hooks/use-eth-price";
import { formatUSD } from "@/utils/formatUSD";
import { parseUnits, formatUnits } from "viem";

type FormValues = {
  wei: string;
  gwei: string;
  eth: string;
};

const sanitizeInput = (value: string, field: keyof FormValues): string => {
  if (field === "wei") {
    return value.replace(/\D/g, "");
  } else {
    let sanitized = value.replace(/[^0-9.]/g, "");
    const parts = sanitized.split(".");
    if (parts.length > 2) {
      sanitized = parts[0] + "." + parts.slice(1).join("").replace(/\./g, "");
    }
    return sanitized;
  }
};

export default function Page() {
  const { data: priceUSD } = useEthPrice();
  const [values, setValues] = useState<FormValues>({
    wei: "",
    gwei: "",
    eth: "",
  });

  const handleUpdate = (field: keyof FormValues, rawVal: string) => {
    const sanitized = sanitizeInput(rawVal, field);
    if (!sanitized) {
      setValues({ wei: "", gwei: "", eth: "" });
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

      const next: FormValues = {
        wei: field === "wei" ? sanitized : wei.toString(),
        gwei: field === "gwei" ? sanitized : formatUnits(wei, 9),
        eth: field === "eth" ? sanitized : formatUnits(wei, 18),
      };

      setValues(next);
    } catch (err) {
      console.error("Conversion error", err);
    }
  };

  return (
    <Container>
      {(["wei", "gwei", "eth"] as const).map((field) => (
        <TextInput
          key={field}
          id={field}
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          placeholder={field}
          value={values[field]}
          onChange={(e) => handleUpdate(field, e.target.value)}
        />
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
    </Container>
  );
}
