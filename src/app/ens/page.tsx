"use client";

import { useState } from "react";
import { isAddress } from "viem/utils";
import Button from "@/ui/Button";
import Container from "@/ui/Container";
import ResultDisplay from "@/ui/ResultDisplay";
import TextInput from "@/ui/TextInput";
import { client } from "@/utils/viemPublicClient";
import Text from "@/ui/Text";

type LookupResult = {
  type: "ens" | "address";
  value: string;
};

export default function Page() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<LookupResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const resolveAddress = async (address: `0x${string}`) => {
    const ensName = await client.getEnsName({ address });
    if (!ensName) throw new Error("No ENS name found for this address.");
    setResult({ type: "address", value: ensName });
  };

  const resolveEnsName = async (ens: string) => {
    const address = await client.getEnsAddress({ name: ens });
    if (!address) throw new Error("ENS name not found.");
    setResult({ type: "ens", value: address });
  };

  const handleLookup = async () => {
    setError("");
    setResult(null);
    setIsLoading(true);

    try {
      const lowerInput = input.toLowerCase();
      if (isAddress(lowerInput)) {
        await resolveAddress(lowerInput);
      } else if (lowerInput.endsWith(".eth")) {
        await resolveEnsName(lowerInput);
      } else {
        throw new Error("Enter a valid ENS name or Ethereum address.");
      }
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to resolve.");
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
          label="ENS Name or Address"
          placeholder="ENS name or Address"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <Button
          label={isLoading ? "Resolving..." : "Resolve"}
          onClick={handleLookup}
          disabled={isLoading}
          expand
        />
      </form>

      {error && (
        <Text variant="error" text={error} size="sm" className="pt-2" />
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
