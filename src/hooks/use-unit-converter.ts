import { sanitizeUnitInput } from "@/utils/sanitize-unit-input";
import { useState } from "react";
import { parseUnits, formatUnits } from "viem";

export type FormValues = {
  wei: string;
  gwei: string;
  eth: string;
};

export const useUnitConverter = () => {
  const [values, setValues] = useState<FormValues>({
    wei: "",
    gwei: "",
    eth: "",
  });

  const handleUpdate = (field: keyof FormValues, rawVal: string) => {
    const sanitized = sanitizeUnitInput(rawVal, field);
    if (!sanitized) {
      setValues({ wei: "", gwei: "", eth: "" });
      return;
    }

    try {
      let wei: bigint;

      if (field === "wei") {
        wei = BigInt(sanitized.replace(/\..*$/, ""));
      } else {
        const decimals = field === "gwei" ? 9 : 18;
        wei = parseUnits(sanitized, decimals);
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

  const clear = () => setValues({ wei: "", gwei: "", eth: "" });

  return { values, handleUpdate, clear };
};
