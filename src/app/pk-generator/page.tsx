"use client";

import { useState, useRef } from "react";
import {
  generatePrivateKey,
  privateKeyToAccount,
  mnemonicToAccount,
} from "viem/accounts";
import * as bip39 from "bip39";

export default function Page() {
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [useSeedPhrase, setUseSeedPhrase] = useState(false);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef({ abort: false });
  const [generatedType, setGeneratedType] = useState<
    "mnemonic" | "privateKey" | null
  >(null);

  const matchesVanity = (address: string, prefix: string, suffix: string) => {
    const lower = address.toLowerCase();
    return (
      (prefix ? lower.startsWith(`0x${prefix.toLowerCase()}`) : true) &&
      (suffix ? lower.endsWith(suffix.toLowerCase()) : true)
    );
  };

  const generateVanityAddress = async (timeoutMs = 5000) => {
    setLoading(true);
    setPrivateKey(null);
    setMnemonic(null);
    setAddress(null);
    abortRef.current.abort = false;

    const startTime = Date.now();

    // Use setTimeout to allow the UI to update before starting the search
    setTimeout(async () => {
      const batchSize = 100; // Process this many addresses before yielding to UI

      while (Date.now() - startTime < timeoutMs) {
        if (abortRef.current.abort) break;

        // Process a batch of addresses
        let createdMatch = false;
        for (let i = 0; i < batchSize; i++) {
          if (useSeedPhrase) {
            const m = await bip39.generateMnemonic();
            const account = await mnemonicToAccount(m);
            if (matchesVanity(account.address, prefix, suffix)) {
              setMnemonic(m);
              setAddress(account.address);
              setGeneratedType("mnemonic");
              createdMatch = true;
              break;
            }
          } else {
            const pk = generatePrivateKey();
            const account = privateKeyToAccount(pk);
            if (matchesVanity(account.address, prefix, suffix)) {
              setPrivateKey(pk);
              setAddress(account.address);
              setGeneratedType("privateKey");
              createdMatch = true;
              break;
            }
          }
        }

        if (createdMatch) {
          setLoading(false);
          return;
        }

        // Yield control back to the UI thread
        await new Promise((resolve) => setTimeout(resolve, 0));
      }

      setLoading(false);
      if (!abortRef.current.abort) alert("No match created within time limit.");
    }, 100); // Small delay to ensure the loading state is rendered
  };

  const handlePrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9a-fA-F]/g, "");
    setPrefix(value);
  };

  const handleSuffixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9a-fA-F]/g, "");
    setSuffix(value);
  };

  const handleGenerate = () => {
    abortRef.current.abort = true;
    setTimeout(() => generateVanityAddress(), 50);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Wallet Generator</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Starts with (e.g. 0000)"
          className="bg-gray-900 text-white px-4 py-2 rounded-xl"
          value={prefix}
          onChange={handlePrefixChange}
        />
        <input
          type="text"
          placeholder="Ends with (e.g. abcd)"
          className="bg-gray-900 text-white px-4 py-2 rounded-xl"
          value={suffix}
          onChange={handleSuffixChange}
        />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <input
          id="seed-toggle"
          type="checkbox"
          checked={useSeedPhrase}
          onChange={() => setUseSeedPhrase((v) => !v)}
        />
        <label htmlFor="seed-toggle" className="text-white">
          Generate Seed Phrase
        </label>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="cursor-pointer bg-blue-600 hover:bg-blue-700 font-semibold px-6 py-3 rounded-xl transition disabled:opacity-50 disabled:hover:bg-blue-600 disabled:cursor-not-allowed"
      >
        {loading
          ? `Generating...`
          : `Generate ${useSeedPhrase ? "Seed Phrase" : "Private Key"}`}
      </button>

      {address && (
        <div className="mt-6 w-full max-w-xl bg-gray-800 p-4 rounded-xl space-y-4">
          {generatedType === "mnemonic" ? (
            <div>
              <h2 className="text-lg font-semibold">Seed Phrase</h2>
              <p className="break-words text-sm text-blue-300">{mnemonic}</p>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold">Private Key</h2>
              <p className="break-all text-sm text-green-400">{privateKey}</p>
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold">ETH Address</h2>
            <p className="break-all text-sm text-yellow-300">{address}</p>
          </div>
        </div>
      )}
    </div>
  );
}
