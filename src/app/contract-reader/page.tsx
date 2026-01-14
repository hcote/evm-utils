"use client";

import erc20Abi from "@/abis/erc20";
import erc721Abi from "@/abis/erc721";
import { jsonStringifyBigInt } from "@/utils/jsonStringifyBigInt";
import { useState, useEffect } from "react";
import { Abi, AbiFunction, isAddress } from "viem";
import Container from "@/ui/Container";
import Button from "@/ui/Button";
import TextInput from "@/ui/TextInput";
import TextArea from "@/ui/TextArea";
import { NETWORKS } from "@/constants/networks";
import { useNetworkSelection } from "@/hooks/use-network-selection";
import NetworkSelector from "@/components/NetworkSelector";
import DropdownMenu from "@/ui/DropdownMenu";

const SAVED_ABIS_KEY = "contract-reader-saved-abis";

const presetAbis: Record<string, Abi> = {
  ERC20: erc20Abi as Abi,
  ERC721: erc721Abi as Abi,
};

const BASE_ABI_OPTIONS = [
  { id: "ERC20", name: "ERC20" },
  { id: "ERC721", name: "ERC721" },
  { id: "Custom", name: "Custom" },
];

type SavedAbi = { id: string; name: string; abi: Abi };

export default function Page() {
  const [contractAddress, setContractAddress] = useState("");
  const [abiOption, setAbiOption] = useState(BASE_ABI_OPTIONS[0]);
  const [abiJson, setAbiJson] = useState("");
  const [abiFunctions, setAbiFunctions] = useState<AbiFunction[]>([]);
  const [inputs, setInputs] = useState<Record<string, string[]>>({});
  const [results, setResults] = useState<Record<string, any>>({});
  const [error, setError] = useState("");
  const [savedAbis, setSavedAbis] = useState<SavedAbi[]>([]);
  const [saveAbiName, setSaveAbiName] = useState("");

  const {
    selectedNetwork,
    customRpcUrl,
    client,
    handleNetworkChange,
    handleCustomRpcUrlChange,
  } = useNetworkSelection();

  // Load saved ABIs from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SAVED_ABIS_KEY);
      if (stored) {
        setSavedAbis(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  const abiOptions = [
    ...BASE_ABI_OPTIONS,
    ...savedAbis.map((s) => ({ id: s.id, name: s.name })),
  ];

  const handleSaveAbi = () => {
    try {
      const parsedAbi = JSON.parse(abiJson);
      const name = saveAbiName.trim() || `Saved ABI ${savedAbis.length + 1}`;
      const id = `saved-${Date.now()}`;
      const newSavedAbi: SavedAbi = { id, name, abi: parsedAbi };
      const updated = [...savedAbis, newSavedAbi];
      setSavedAbis(updated);
      localStorage.setItem(SAVED_ABIS_KEY, JSON.stringify(updated));
      setSaveAbiName("");
      setAbiOption({ id, name });
      setError("");
    } catch {
      setError("Invalid ABI JSON");
    }
  };

  const handleDeleteSavedAbi = (id: string) => {
    const updated = savedAbis.filter((s) => s.id !== id);
    setSavedAbis(updated);
    localStorage.setItem(SAVED_ABIS_KEY, JSON.stringify(updated));
    if (abiOption.id === id) {
      setAbiOption(BASE_ABI_OPTIONS[0]);
    }
  };

  const handleLoadAbi = () => {
    try {
      let abi: Abi;
      if (abiOption.id === "Custom") {
        abi = JSON.parse(abiJson);
      } else if (abiOption.id.startsWith("saved-")) {
        const saved = savedAbis.find((s) => s.id === abiOption.id);
        if (!saved) throw new Error("Saved ABI not found");
        abi = saved.abi;
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
      if (!client) throw new Error("Client not found");
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
      const testNetwork = NETWORKS.find((n) => n?.chain?.id === 1); // Mainnet
      if (!testNetwork) throw new Error("Mainnet not found in network list");

      const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
      const abi = presetAbis.ERC20;

      setContractAddress(usdcAddress);
      setAbiOption(BASE_ABI_OPTIONS[0]);

      const viewFns = abi.filter(
        (fn: any) =>
          fn.type === "function" &&
          (fn.stateMutability === "view" || fn.stateMutability === "pure")
      ) as AbiFunction[];

      // Uncomment out to query each function and populate results
      // const resultsMap: Record<string, any> = {};
      // for (const fn of viewFns) {
      //   if (fn.inputs.length === 0) {
      //     try {
      //       const result = await testClient.readContract({
      //         address: usdcAddress,
      //         abi: [fn],
      //         functionName: fn.name,
      //       });
      //       resultsMap[fn.name] = result;
      //     } catch (err: any) {
      //       resultsMap[fn.name] = `Error: ${err.message}`;
      //     }
      //   }
      // }

      setAbiFunctions(viewFns);
      // setResults(resultsMap);
      setError("");
    } catch (err: any) {
      setError(err.message || "Error running test");
    }
  };

  const isInputEmpty = !contractAddress;

  return (
    <Container>
      <div>
        <NetworkSelector
          selectedNetwork={selectedNetwork}
          customRpcUrl={customRpcUrl}
          onNetworkChange={handleNetworkChange}
          onCustomRpcUrlChange={handleCustomRpcUrlChange}
        />

        <TextInput
          placeholder="Contract Address"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          label="Contract Address"
        />
      </div>

      <DropdownMenu
        selected={abiOption}
        options={abiOptions}
        onSelect={setAbiOption}
        buttonClassName="w-full"
        dropdownClassName="w-full"
        dropdownItemClassName="w-full"
        renderOption={(option) => (
          <div className="flex items-center justify-between w-full">
            <span>{option.name}</span>
            {option.id.startsWith("saved-") && (
              <span
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteSavedAbi(option.id);
                }}
                className="ml-2 text-xs text-red-400 hover:text-red-300 cursor-pointer"
              >
                ✕
              </span>
            )}
          </div>
        )}
      />

      {abiOption.id === "Custom" && (
        <div className="space-y-3">
          <TextArea
            placeholder="Paste ABI JSON"
            value={abiJson}
            onChange={(e) => setAbiJson(e.target.value)}
          />
          <div className="flex gap-2">
            <TextInput
              placeholder="ABI Name (optional)"
              value={saveAbiName}
              onChange={(e) => setSaveAbiName(e.target.value)}
            />
            <Button
              label="Save ABI"
              onClick={handleSaveAbi}
              disabled={!abiJson.trim()}
              variant="inverse"
            />
          </div>
        </div>
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
            <span className="text-sm font-normal text-[var(--color-text-secondary)]">
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

        {error && (
          <p className="text-sm text-[var(--color-text-error)] pt-2">{error}</p>
        )}
      </div>

      {abiFunctions.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] border-t border-white/10 pt-4 pb-2">
            Contract Methods
          </h2>

          <div className="grid gap-3">
            {abiFunctions.map((fn) => (
              <div
                key={fn.name}
                className="border border-white/10 rounded-lg p-3 bg-[var(--color-bg)]/50 backdrop-blur-sm hover:border-white/20 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold text-[var(--color-text-primary)] font-mono">
                    {fn.name}()
                  </h3>
                  <Button
                    label="Call"
                    onClick={() => callFunction(fn)}
                    size="sm"
                  />
                </div>

                {fn.inputs.length > 0 && (
                  <div className="space-y-2">
                    {fn.inputs.map((input, index) => (
                      <div key={index} className="space-y-1">
                        <label className="text-xs text-[var(--color-text-secondary)] font-medium">
                          {input.name || `arg${index}`}
                          <span className="ml-1.5 font-mono opacity-70">
                            ({input.type})
                          </span>
                        </label>
                        <TextInput
                          placeholder={`${input.type}`}
                          value={inputs[fn.name]?.[index] || ""}
                          onChange={(e) =>
                            handleInputChange(fn.name, index, e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}

                {results[fn.name] !== undefined && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <span className="font-mono text-xs text-[var(--color-accent)] whitespace-pre-wrap break-all">
                      {JSON.stringify(
                        jsonStringifyBigInt(results[fn.name]),
                        null,
                        2
                      )}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
