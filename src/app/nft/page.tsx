"use client";

import { useState } from "react";
import { isAddress } from "viem/utils";
import erc721Abi from "@/abis/erc721"; // assumed local ABI file for ERC721
import { client } from "@/utils/viemPublicClient";
import { resolveIPFS } from "@/utils/resolveIPFS";

export default function Page() {
  const [address, setAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<any>(null);
  const [error, setError] = useState("");

  const fetchMetadata = async () => {
    setLoading(true);
    setError("");
    setMetadata(null);

    try {
      if (!isAddress(address)) throw new Error("Invalid address");
      if (!tokenId) throw new Error("Token ID is required");

      const tokenURI = await client.readContract({
        address: address as `0x${string}`,
        abi: erc721Abi,
        functionName: "tokenURI",
        args: [BigInt(tokenId)],
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

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">NFT Metadata Viewer</h1>
      <div className="flex gap-2">
        <input
          className="bg-gray-800 border border-gray-600 rounded px-3 py-2 w-72"
          placeholder="NFT Contract Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          className="bg-gray-800 border border-gray-600 rounded px-3 py-2 w-40"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          onClick={fetchMetadata}
        >
          Fetch
        </button>
      </div>

      {loading && <div className="text-gray-400">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {metadata && (
        <div className="bg-gray-900 rounded p-4 mt-4 w-full max-w-xl">
          <h2 className="text-xl font-semibold mb-2">Metadata:</h2>
          <pre className="whitespace-pre-wrap break-all text-sm">
            {JSON.stringify(metadata, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
