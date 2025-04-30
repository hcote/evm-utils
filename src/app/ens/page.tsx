"use client";

import Button from "@/ui/Button";
import Container from "@/ui/Container";
import ResultDisplay from "@/ui/ResultDisplay";
import TextInput from "@/ui/TextInput";
import { client } from "@/utils/viemPublicClient";
import { useState } from "react";

export default function Page() {
  const [ensName, setEnsName] = useState("");
  const [resolvedAddress, setResolvedAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleResolve = async () => {
    setError("");
    setResolvedAddress(null);
    setIsLoading(true);

    try {
      const [address] = await Promise.all([
        client.getEnsAddress({ name: ensName }).catch(() => null),
      ]);

      setResolvedAddress(address);

      if (!address) {
        throw new Error("ENS name not found.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to resolve ENS name.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="bg-[var(--color-surface)] text-[var(--color-text-primary)] rounded-2xl shadow-lg border border-[var(--color-surface)] space-y-4">
        <TextInput
          label="ENS Name"
          placeholder="Enter ENS name (e.g. vitalik.eth)"
          value={ensName}
          onChange={(e) => setEnsName(e.target.value)}
        />

        <Button
          label={isLoading ? "Resolving..." : "Resolve"}
          onClick={handleResolve}
          disabled={isLoading || !ensName.includes(".eth")}
          expand
        />

        {error && (
          <p className="text-sm text-[var(--color-text-error)] pt-2">
            Error: {error}
          </p>
        )}
      </div>

      {resolvedAddress && (
        <ResultDisplay
          wrapPreText
          items={[
            {
              header: "Resolved Address:",
              text: resolvedAddress,
              className: "font-mono break-all",
            },
          ]}
        />
      )}
    </Container>
  );
}
