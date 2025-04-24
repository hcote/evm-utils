"use client";

import erc20Abi from "@/abis/erc20";
import erc721Abi from "@/abis/erc721";
import { jsonStringifyBigInt } from "@/utils/jsonStringifyBigInt";
import { useState } from "react";
import { Abi, AbiFunction, createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const presetAbis: Record<string, Abi> = {
  ERC20: erc20Abi as Abi,
  ERC721: erc721Abi as Abi,
};

/**
 * TODO: Before fetching the methods, ensure it follows that interface
 * i.e. I can successfully call loadABI on a erc20 token address
 * when I have erc721 abi loaded
 */
export default function Page() {
  const [contractAddress, setContractAddress] = useState("");
  const [abiOption, setAbiOption] = useState("ERC20");
  const [abiJson, setAbiJson] = useState("");
  const [abiFunctions, setAbiFunctions] = useState<AbiFunction[]>([]);
  const [inputs, setInputs] = useState<Record<string, string[]>>({});
  const [results, setResults] = useState<Record<string, any>>({});
  const [error, setError] = useState("");

  const handleLoadAbi = () => {
    try {
      let abi: Abi;
      if (abiOption === "Custom") {
        abi = JSON.parse(abiJson);
      } else {
        abi = presetAbis[abiOption];
      }
      const viewFns = abi.filter(
        (fn: any) =>
          fn.type === "function" &&
          (fn.stateMutability === "view" || fn.stateMutability === "pure")
      ) as AbiFunction[];
      setAbiFunctions(viewFns);
      setError("");
    } catch {
      setError("Invalid ABI");
    }
  };

  const handleInputChange = (fnName: string, index: number, value: string) => {
    setInputs((prev) => {
      const updated = [...(prev[fnName] || [])];
      updated[index] = value;
      return { ...prev, [fnName]: updated };
    });
  };

  const callFunction = async (fn: AbiFunction) => {
    try {
      const args = inputs[fn.name] || [];
      const parsedArgs = fn.inputs.map((_, i) => args[i]);
      const result = await client.readContract({
        address: contractAddress as `0x${string}`,
        abi: [fn],
        functionName: fn.name,
        args: parsedArgs,
      });
      setResults((prev) => ({ ...prev, [fn.name]: result }));
    } catch (err: any) {
      setResults((prev) => ({
        ...prev,
        [fn.name]: `Error: ${err.message}`,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Contract Reader</h1>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Enter contract address"
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />

        <select
          value={abiOption}
          onChange={(e) => setAbiOption(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
        >
          <option value="ERC20">ERC20</option>
          <option value="ERC721">ERC721</option>
          <option value="Custom">Other (Paste ABI)</option>
        </select>

        {abiOption === "Custom" && (
          <textarea
            placeholder="Paste ABI JSON here"
            className="w-full h-40 p-2 bg-gray-800 border border-gray-700 rounded"
            value={abiJson}
            onChange={(e) => setAbiJson(e.target.value)}
          />
        )}

        <button
          onClick={handleLoadAbi}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Load ABI
        </button>

        {error && <p className="text-red-400">{error}</p>}
      </div>

      <div className="space-y-6">
        {abiFunctions.map((fn) => (
          <div key={fn.name} className="border border-gray-700 p-4 rounded">
            <h2 className="text-lg font-semibold">{fn.name}</h2>
            <div className="flex flex-col gap-2 mt-2">
              {fn.inputs.map((input, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`${input.name || "arg" + index} (${input.type})`}
                  className="p-2 bg-gray-800 border border-gray-700 rounded"
                  value={inputs[fn.name]?.[index] || ""}
                  onChange={(e) =>
                    handleInputChange(fn.name, index, e.target.value)
                  }
                />
              ))}
              <button
                onClick={() => callFunction(fn)}
                className="bg-green-600 px-3 py-1 mt-2 rounded hover:bg-green-700 w-fit"
              >
                Call {fn.name}
              </button>
              {results[fn.name] !== undefined && (
                <div className="mt-2 text-sm text-gray-300">
                  Result:{" "}
                  <span className="break-words">
                    {jsonStringifyBigInt(results[fn.name])}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
