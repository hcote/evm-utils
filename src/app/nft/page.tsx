"use client";

import { useState } from "react";
import { isAddress } from "viem/utils";
import erc721Abi from "@/abis/erc721";
import { resolveIPFS } from "@/utils/resolveIPFS";
import { getPublicClient } from "@/utils/viemPublicClient";

import Container from "@/ui/Container";
import Button from "@/ui/Button";
import TextInput from "@/ui/TextInput";
import Image from "next/image";
import { NETWORKS } from "@/constants/networks";
import DropdownMenu from "@/ui/DropdownMenu";
import ResultDisplay from "@/ui/ResultDisplay";

export default function Page() {
  const [address, setAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<any>(null);
  const [error, setError] = useState("");

  const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS[0]);
  const [client, setClient] = useState(() =>
    getPublicClient(NETWORKS[0].chain)
  );

  const fetchMetadata = async (addr = address, id = tokenId) => {
    setLoading(true);
    setError("");
    setMetadata(null);

    try {
      if (!isAddress(addr)) throw new Error("Invalid address");
      if (!id) throw new Error("Token ID is required");

      const tokenURI = await client.readContract({
        address: addr as `0x${string}`,
        abi: erc721Abi,
        functionName: "tokenURI",
        args: [BigInt(id)],
      });

      const resolvedURI = resolveIPFS(tokenURI);
      const res = await fetch(resolvedURI);
      if (!res.ok) throw new Error("Failed to fetch metadata from URI");

      const data = await res.json();
      setMetadata(data);
    } catch (err: any) {
      setError(err.message || "Error fetching metadata");
    } finally {
      setLoading(false);
    }
  };

  const handleTest = async () => {
    const testAddress = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
    const testTokenId = "1";
    await fetchMetadata(testAddress, testTokenId);
  };

  const isInputEmpty = !address && !tokenId;

  return (
    <Container size="lg" className="space-y-6">
      {/* Network Dropdown */}
      <div className="flex justify-end">
        <DropdownMenu
          selected={selectedNetwork}
          options={NETWORKS}
          onSelect={(network) => {
            setSelectedNetwork(network);
            setClient(getPublicClient(network.chain));
          }}
        />
      </div>

      {/* Form */}
      <div className="bg-[var(--color-surface)] text-[var(--color-text-primary)] rounded-2xl shadow-lg border border-[var(--color-surface)] space-y-4">
        <TextInput
          placeholder="NFT Contract Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <TextInput
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />

        <div className="flex flex-col align-center items-center justify-center gap-4">
          <Button
            label={loading ? "Fetching..." : "Fetch Metadata"}
            onClick={() => fetchMetadata()}
            disabled={loading || !address || !tokenId}
            expand
          />

          {isInputEmpty && (
            <>
              <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
                OR
              </span>
              <Button
                label="Test it out"
                onClick={handleTest}
                disabled={loading}
                expand
                variant="inverse"
              />
            </>
          )}
        </div>

        {error && <p className="text-sm text-red-400 pt-2">{error}</p>}
      </div>

      {/* Result */}
      {metadata && (
        <>
          {/* {metadata.image && (
            <Image
              src={resolveIPFS(metadata.image)}
              alt="NFT preview"
              width={160}
              height={160}
              className="rounded-xl border border-[var(--color-border)] shadow"
            />
          )} */}
          <ResultDisplay
            items={[
              {
                header: "Metadata",
                text: JSON.stringify(metadata, null, 2),
                className: "text-sm leading-relaxed", // optional styling for spacing
              },
            ]}
          />
        </>
      )}
    </Container>
  );
}
