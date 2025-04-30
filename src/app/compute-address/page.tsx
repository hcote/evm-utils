"use client";

import Button from "@/ui/Button";
import Container from "@/ui/Container";
import ResultDisplay from "@/ui/ResultDisplay";
import TextInput from "@/ui/TextInput";
import { useState } from "react";
import { isAddress, getContractAddress } from "viem/utils";

export default function Page() {
  const [walletAddress, setWalletAddress] = useState("");
  const [nonce, setNonce] = useState("");
  const [contractAddress, setContractAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = () => {
    try {
      setError(null);

      if (!isAddress(walletAddress)) {
        setError("Invalid wallet address.");
        return;
      }

      const nonceInt = parseInt(nonce);

      if (isNaN(nonceInt) || nonceInt < 0) {
        setError("Nonce must be a valid non-negative number.");
        return;
      }

      const generated = getContractAddress({
        from: walletAddress as `0x${string}`,
        nonce: BigInt(nonceInt),
      });

      setContractAddress(generated);
    } catch (err: any) {
      setError("An error occurred. Please check your inputs.");
      setContractAddress(null);
    }
  };

  return (
    <Container>
      <div className="bg-[var(--color-surface)] text-[var(--color-text-primary)] rounded-2xl shadow-lg border border-[var(--color-surface)] space-y-4">
        <TextInput
          label="Wallet Address"
          placeholder="Wallet address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />

        <TextInput
          label="Nonce"
          placeholder="Nonce"
          value={nonce}
          onChange={(e) => setNonce(e.target.value)}
        />

        <Button
          expand
          label="Generate Address"
          onClick={handleGenerate}
          disabled={!isAddress(walletAddress) || !nonce}
        />

        {error && (
          <p className="text-sm text-[var(--color-text-error)] pt-2">{error}</p>
        )}
      </div>

      {contractAddress && (
        <ResultDisplay
          wrapPreText
          items={[
            {
              header: "Contract Address:",
              text: contractAddress,
              className: "font-mono break-words",
            },
          ]}
        />
      )}
    </Container>
  );
}
