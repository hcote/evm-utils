"use client";

import { jsonStringifyBigInt } from "@/utils/jsonStringifyBigInt";
import { useState } from "react";
import { parseTransaction } from "viem";
import { isHex } from "viem/utils";

export default function Page() {
  const [rawTx, setRawTx] = useState("");
  const [decoded, setDecoded] = useState<any>(null);
  const [error, setError] = useState("");

  const handleDecode = () => {
    try {
      setError("");
      if (!isHex(rawTx)) throw new Error("Input is not valid hex.");
      const tx = parseTransaction(rawTx as `0x${string}`);
      setDecoded(jsonStringifyBigInt(tx));
    } catch (err: any) {
      setDecoded(null);
      setError(err.message || "Failed to decode transaction");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Raw Transaction Decoder</h1>

      <div className="flex flex-col gap-4 max-w-xl">
        <input
          type="text"
          placeholder="Enter raw transaction hash (0x...)"
          value={rawTx}
          onChange={(e) => setRawTx(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-400"
        />
        <button
          onClick={handleDecode}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl w-fit"
        >
          Decode Transaction
        </button>

        {error && <p className="text-red-400">{error}</p>}

        {decoded && (
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-700 mt-4 overflow-x-auto">
            <pre className="whitespace-pre-wrap break-all text-sm">
              {JSON.stringify(decoded, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
