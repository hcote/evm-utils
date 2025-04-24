"use client";

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
    <div className="flex items-center justify-center px-4">
      <div className="p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h1 className="text-xl font-semibold">Contract Address Generator</h1>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Wallet Address</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0x..."
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Nonce</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 0"
            value={nonce}
            onChange={(e) => setNonce(e.target.value)}
          />
        </div>

        <button
          onClick={handleGenerate}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Generate Address
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {contractAddress && (
          <div className="p-3 rounded text-sm break-words">
            <strong>Contract Address:</strong> {contractAddress}
          </div>
        )}
      </div>
    </div>
  );
}
