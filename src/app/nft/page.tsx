"use client";

import { useState } from "react";
import { isAddress } from "viem/utils";
import erc721Abi from "@/abis/erc721";
import { resolveIPFS } from "@/utils/resolveIPFS";
import {
  client as mainnetClient,
  getPublicClient,
} from "@/utils/viemPublicClient";
import Container from "@/ui/Container";
import Button from "@/ui/Button";
import TextInput from "@/ui/TextInput";
import Image from "next/image";
import { NETWORKS } from "@/constants/networks";
import DropdownMenu from "@/ui/DropdownMenu";
import ResultDisplay from "@/ui/ResultDisplay";
import IcoChevronDown from "@/icons/IcoChevronDown";

export default function Page() {
  const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS[0]);

  const [address, setAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [tokenURI, setTokenURI] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [openImage, setOpenImage] = useState(false);

  const [client, setClient] = useState(() =>
    getPublicClient(NETWORKS[0].chain)
  );

  const isInputEmpty = !address && !tokenId;

  const fetchMetadata = async (
    addr = address,
    id = tokenId,
    overrideClient = client
  ) => {
    setLoading(true);
    setError("");

    try {
      if (!isAddress(addr)) throw new Error("Invalid address");
      if (!id) throw new Error("Token ID is required");

      const uri = await overrideClient.readContract({
        address: addr as `0x${string}`,
        abi: erc721Abi,
        functionName: "tokenURI",
        args: [BigInt(id)],
      });

      setTokenURI(uri);

      const resolvedURI = resolveIPFS(uri);
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
    await fetchMetadata(testAddress, testTokenId, mainnetClient);
  };

  return (
    <Container>
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

      <TextInput
        label="NFT Address"
        placeholder="NFT Contract Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <TextInput
        label="Token ID"
        placeholder="Token ID"
        value={tokenId}
        onChange={(e) => {
          const numericOnly = e.target.value.replace(/\D/g, "");
          setTokenId(numericOnly);
        }}
      />

      <div className="flex flex-col align-center items-center justify-center gap-4">
        <Button
          label={loading ? "Fetching..." : "Fetch Metadata"}
          onClick={() => fetchMetadata()}
          disabled={loading || !isAddress(address) || !tokenId}
          expand
        />

        {isInputEmpty && (
          <>
            <span className="text-sm font-normal text-[var(--color-text-secondary)]">
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

      {error && (
        <p className="text-sm text-[var(--color-text-error)] pt-2">{error}</p>
      )}

      {metadata && (
        <>
          {metadata.image && (
            <div>
              <button
                onClick={() => setOpenImage((prev) => !prev)}
                className="cursor-pointer text-sm text-[var(--color-accent)] hover:bg-[var(--color-bg)] px-3 py-3 rounded-xl transition-colors inline-flex items-center"
              >
                View NFT Image
                <span
                  className={`ml-1 transform transition-transform duration-200 ${
                    openImage ? "rotate-180" : ""
                  }`}
                >
                  <IcoChevronDown size={16} />
                </span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden mt-2 ${
                  openImage ? "max-h-[512px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-2">
                  <Image
                    src={resolveIPFS(metadata.image)}
                    alt="NFT preview"
                    width={160}
                    height={160}
                    className="rounded-xl border border-[var(--color-border)]"
                  />
                </div>
              </div>
            </div>
          )}
          <ResultDisplay
            items={[
              {
                header: "tokenURI:",
                text: tokenURI || "",
                className: "text-sm leading-relaxed",
              },
              {
                header: "Metadata:",
                text: JSON.stringify(metadata, null, 2),
                className: "text-sm leading-relaxed",
              },
            ]}
          />
        </>
      )}
    </Container>
  );
}
