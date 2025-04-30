"use client";

import erc20Abi from "@/abis/erc20";
import erc721Abi from "@/abis/erc721";
import { jsonStringifyBigInt } from "@/utils/jsonStringifyBigInt";
import { useState } from "react";
import { Abi, AbiFunction, isAddress } from "viem";
import { getPublicClient } from "@/utils/viemPublicClient";
import Container from "@/ui/Container";
import Button from "@/ui/Button";
import TextInput from "@/ui/TextInput";
import TextArea from "@/ui/TextArea";
import { NETWORKS } from "@/constants/networks";
import DropdownMenu from "@/ui/DropdownMenu";

const presetAbis: Record<string, Abi> = {
  ERC20: erc20Abi as Abi,
  ERC721: erc721Abi as Abi,
};

const ABI_OPTIONS = [
  { id: "ERC20", name: "ERC20" },
  { id: "ERC721", name: "ERC721" },
  { id: "Custom", name: "Custom" },
];

export default function Page() {
  const [contractAddress, setContractAddress] = useState("");
  const [abiOption, setAbiOption] = useState(ABI_OPTIONS[0]);
  const [abiJson, setAbiJson] = useState("");
  const [abiFunctions, setAbiFunctions] = useState<AbiFunction[]>([]);
  const [inputs, setInputs] = useState<Record<string, string[]>>({});
  const [results, setResults] = useState<Record<string, any>>({});
  const [error, setError] = useState("");

  const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS[0]);
  const [client, setClient] = useState(() =>
    getPublicClient(NETWORKS[0].chain)
  );

  const handleLoadAbi = () => {
    try {
      let abi: Abi;
      if (abiOption.id === "Custom") {
        abi = JSON.parse(abiJson);
      } else {
        abi = presetAbis[abiOption.id];
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

  const handleTest = async () => {
    try {
      const testNetwork = NETWORKS.find((n) => n.chain.id === 1); // Mainnet
      if (!testNetwork) throw new Error("Mainnet not found in network list");

      const testClient = getPublicClient(testNetwork.chain);
      const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
      const abi = presetAbis.ERC20;

      const viewFns = abi.filter(
        (fn: any) =>
          fn.type === "function" &&
          (fn.stateMutability === "view" || fn.stateMutability === "pure")
      ) as AbiFunction[];

      const resultsMap: Record<string, any> = {};
      for (const fn of viewFns) {
        if (fn.inputs.length === 0) {
          try {
            const result = await testClient.readContract({
              address: usdcAddress,
              abi: [fn],
              functionName: fn.name,
            });
            resultsMap[fn.name] = result;
          } catch (err: any) {
            resultsMap[fn.name] = `Error: ${err.message}`;
          }
        }
      }

      setAbiFunctions(viewFns);
      setResults(resultsMap);
      setError("");
    } catch (err: any) {
      setError(err.message || "Error running test");
    }
  };

  const isInputEmpty = !contractAddress;

  return (
    <Container className="space-y-6">
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

      <div className="bg-[var(--color-surface)] text-[var(--color-text-primary)] rounded-2xl shadow-lg border border-[var(--color-surface)] space-y-4">
        <TextInput
          placeholder="Contract Address"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />

        <DropdownMenu
          selected={abiOption}
          options={ABI_OPTIONS}
          onSelect={setAbiOption}
          buttonClassName="w-full"
          dropdownClassName="w-full"
          dropdownItemClassName="w-full"
        />

        {abiOption.id === "Custom" && (
          <TextArea
            placeholder="Paste ABI JSON"
            value={abiJson}
            onChange={(e) => setAbiJson(e.target.value)}
          />
        )}

        <div className="flex flex-col items-center justify-center gap-4">
          <Button
            expand
            label="Load Contract"
            onClick={handleLoadAbi}
            disabled={!isAddress(contractAddress)}
          />

          {isInputEmpty && (
            <>
              <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
                OR
              </span>
              <Button
                label="Test it out"
                onClick={handleTest}
                variant="inverse"
                expand
              />
            </>
          )}
        </div>

        {error && (
          <p className="text-sm text-[var(--color-text-error)] pt-2">{error}</p>
        )}
      </div>

      {abiFunctions.length > 0 && (
        <div className="space-y-6">
          {abiFunctions.map((fn) => (
            <div
              key={fn.name}
              className="px-8 py-6 bg-[var(--color-surface)] text-[var(--color-text-primary)] rounded-2xl shadow-lg border border-[var(--color-surface)] space-y-4"
            >
              <h2 className="text-lg font-semibold">{fn.name}</h2>

              {fn.inputs.map((input, index) => (
                <TextInput
                  key={index}
                  placeholder={`${input.name || "arg" + index} (${input.type})`}
                  value={inputs[fn.name]?.[index] || ""}
                  onChange={(e) =>
                    handleInputChange(fn.name, index, e.target.value)
                  }
                />
              ))}

              <Button
                label={`Call ${fn.name}`}
                onClick={() => callFunction(fn)}
              />

              {results[fn.name] !== undefined && (
                <div className="mt-2 text-sm text-[var(--color-text-secondary)] whitespace-pre-wrap break-all">
                  Result: {jsonStringifyBigInt(results[fn.name])}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
