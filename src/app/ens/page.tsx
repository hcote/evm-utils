"use client";

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
      // Get both the resolved address and the owner
      const [address] = await Promise.all([
        client.getEnsAddress({ name: ensName }).catch(() => null),
      ]);

      setResolvedAddress(address);

      // If neither address nor owner is found
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
    <div className="flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">ENS Resolver</h1>
      <div className="flex w-full max-w-md mb-4">
        <input
          type="text"
          placeholder="Enter ENS name (e.g. vitalik.eth)"
          value={ensName}
          onChange={(e) => setEnsName(e.target.value)}
          className="w-full p-3 rounded-l-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-400"
        />
        <button
          onClick={handleResolve}
          disabled={isLoading || !ensName.includes(".eth")}
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-r-xl"
        >
          {isLoading ? "Loading..." : "Resolve"}
        </button>
      </div>

      {resolvedAddress && (
        <div className="mt-6 p-4 bg-gray-800 rounded-xl w-full max-w-md">
          {resolvedAddress && (
            <div>
              <span className="text-gray-400">Resolved Address:</span>
              <div className="text-green-400 font-mono break-all">
                {resolvedAddress}
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-900/20 border border-red-700 rounded-xl text-red-400 w-full max-w-md">
          Error: {error}
        </div>
      )}
    </div>
  );
}
