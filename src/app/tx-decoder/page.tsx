"use client";

import Button from "@/ui/Button";
import Container from "@/ui/Container";
import ResultDisplay from "@/ui/ResultDisplay";
import Text from "@/ui/Text";
import TextArea from "@/ui/TextArea";
import { jsonStringifyBigInt } from "@/utils/jsonStringifyBigInt";
import { useState } from "react";
import { parseTransaction } from "viem";
import { isHex } from "viem/utils";

export default function Page() {
  const [rawTx, setRawTx] = useState("");
  const [decoded, setDecoded] = useState<any>(null);
  const [error, setError] = useState("");

  const testHex =
    "0x02ef0182031184773594008477359400809470997970c51812dc3a010c7d01b50e0d17dc79c8880de0b6b3a764000080c0";

  const handleDecode = (isTestData = false) => {
    const input = isTestData ? testHex : rawTx;
    try {
      setError("");
      if (!isHex(input)) throw new Error("Input is not a valid transaction.");
      const tx = parseTransaction(input as `0x${string}`);
      setDecoded(jsonStringifyBigInt(tx));
    } catch (err: unknown) {
      setDecoded(null);
      setError((err as Error).message || "Failed to decode transaction");
    }
  };

  return (
    <Container className="space-y-6">
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
            <Text text="OR" variant="secondary" size="sm" />
            <Button
              label="Test it out"
              onClick={() => handleDecode(true)}
              variant="inverse"
              expand
            />
          </>
        )}
      </div>

      {error && (
        <Text variant="error" text={error} size="sm" className="pt-2" />
      )}

      {decoded && (
        <ResultDisplay
          items={[
            {
              header: "Decoded Transaction:",
              text: JSON.stringify(decoded, null, 2),
            },
          ]}
        />
      )}
    </Container>
  );
}
