"use client";

import Button from "@/ui/Button";
import Container from "@/ui/Container";
import ResultDisplay from "@/ui/ResultDisplay";
import TextArea from "@/ui/TextArea";
import { jsonStringifyBigInt } from "@/utils/jsonStringifyBigInt";
import { useState } from "react";
import { parseTransaction } from "viem";
import { isHex } from "viem/utils";

export default function Page() {
  const [rawTx, setRawTx] = useState("");
  const [decoded, setDecoded] = useState<any>(null);
  const [testDecoded, setTestDecoded] = useState<any>(null);
  const [error, setError] = useState("");

  const handleDecode = () => {
    try {
      setError("");
      setTestDecoded(null); // clear test result
      if (!isHex(rawTx)) throw new Error("Input is not a valid transaction.");
      const tx = parseTransaction(rawTx as `0x${string}`);
      setDecoded(jsonStringifyBigInt(tx));
    } catch (err: any) {
      setDecoded(null);
      setError(err.message || "Failed to decode transaction");
    }
  };

  const handleTest = () => {
    const testHex =
      "0x02ef0182031184773594008477359400809470997970c51812dc3a010c7d01b50e0d17dc79c8880de0b6b3a764000080c0";
    try {
      setDecoded(null); // clear real result
      const tx = parseTransaction(testHex as `0x${string}`);
      setTestDecoded(jsonStringifyBigInt(tx));
    } catch (err: any) {
      setTestDecoded({ error: err.message });
    }
  };

  return (
    <Container size="xl" className="space-y-6">
      <TextArea
        placeholder="Enter raw transaction (0x...)"
        value={rawTx}
        onChange={(e) => setRawTx(e.target.value)}
        rows={3}
      />

      <div className="flex flex-col items-center justify-center gap-4">
        <Button
          disabled={!rawTx}
          label="Decode Transaction"
          onClick={handleDecode}
          expand
        />

        {!rawTx && (
          <>
            <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
              OR
            </span>
            <Button
              label="Test it out"
              onClick={handleTest}
              variant="inverse"
              expand
            />
          </>
        )}
      </div>

      {error && <p className="text-sm text-red-400 pt-2">{error}</p>}

      {(decoded || testDecoded) && (
        <ResultDisplay
          items={[
            {
              header: "Decoded Transaction:",
              text: JSON.stringify(decoded || testDecoded, null, 2),
            },
          ]}
        />
      )}
    </Container>
  );
}
