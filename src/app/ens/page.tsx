"use client";

import { useState } from "react";
import { isAddress } from "viem/utils";
import Button from "@/ui/Button";
import Container from "@/ui/Container";
import ResultDisplay from "@/ui/ResultDisplay";
import TextInput from "@/ui/TextInput";
import { client } from "@/utils/viemPublicClient";

export default function Page() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    type: "ens" | "address";
    value: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLookup = async () => {
    setError("");
    setResult(null);
    setIsLoading(true);

    try {
      if (isAddress(input)) {
        const ensName = await client.getEnsName({ address: input });
        if (!ensName) throw new Error("No ENS name found for this address.");
        setResult({ type: "address", value: ensName });
      } else if (input.toLowerCase().endsWith(".eth")) {
        const address = await client.getEnsAddress({
          name: input.toLowerCase(),
        });
        if (!address) throw new Error("ENS name not found.");
        setResult({ type: "ens", value: address });
      } else {
        throw new Error("Enter a valid ENS name or Ethereum address.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to resolve.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLookup();
        }}
        className="space-y-4"
      >
        <TextInput
          label="ENS or Address"
          placeholder="ENS name or Address"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <Button
          label={isLoading ? "Resolving..." : "Resolve"}
          onClick={handleLookup}
          disabled={isLoading || input.trim() === ""}
          expand
        />
      </form>

      {error && (
        <p className="text-sm text-[var(--color-text-error)] pt-2">
          Error: {error}
        </p>
      )}

      {result && (
        <ResultDisplay
          wrapPreText
          items={[
            {
              header:
                result.type === "ens"
                  ? "Resolved Address:"
                  : "Resolved ENS Name:",
              text: result.value,
              className: "font-mono break-all",
            },
          ]}
        />
      )}
    </Container>
  );
}
