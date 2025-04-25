"use client";

import { useState, useRef, JSX } from "react";
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
  const [contains, setContains] = useState("");
  const abortRef = useRef({ abort: false });
  const [generatedType, setGeneratedType] = useState<
    "mnemonic" | "privateKey" | null
  >(null);
  const [generatedHighlight, setGeneratedHighlight] = useState({
    prefix: "",
    suffix: "",
    contains: "",
  });

  const matchesVanity = (
    address: string,
    prefix: string,
    suffix: string,
    contains: string
  ) => {
    const lower = address.toLowerCase();
    return (
      (!prefix || lower.startsWith(`0x${prefix.toLowerCase()}`)) &&
      (!suffix || lower.endsWith(suffix.toLowerCase())) &&
      (!contains || lower.includes(contains.toLowerCase()))
    );
  };

  const generateVanityAddress = async (timeoutMs = 5000) => {
    setLoading(true);
    setPrivateKey(null);
    setMnemonic(null);
    setAddress(null);
    abortRef.current.abort = false;
    const startTime = Date.now();

    setTimeout(async () => {
      const batchSize = 100;
      while (Date.now() - startTime < timeoutMs) {
        if (abortRef.current.abort) break;
        let createdMatch = false;

        for (let i = 0; i < batchSize; i++) {
          if (useSeedPhrase) {
            const m = await bip39.generateMnemonic();
            const account = await mnemonicToAccount(m);
            if (matchesVanity(account.address, prefix, suffix, contains)) {
              setMnemonic(m);
              setAddress(account.address);
              setGeneratedType("mnemonic");
              setGeneratedHighlight({ prefix, suffix, contains });
              createdMatch = true;
              break;
            }
          } else {
            const pk = generatePrivateKey();
            const account = privateKeyToAccount(pk);
            if (matchesVanity(account.address, prefix, suffix, contains)) {
              setPrivateKey(pk);
              setAddress(account.address);
              setGeneratedType("privateKey");
              setGeneratedHighlight({ prefix, suffix, contains });
              createdMatch = true;
              break;
            }
          }
        }

        if (createdMatch) {
          setLoading(false);
          return;
        }

        await new Promise((res) => setTimeout(res, 0));
      }

      setLoading(false);
      if (!abortRef.current.abort) alert("No match created within time limit.");
    }, 100);
  };

  const highlightAddressParts = (
    address: string,
    prefix: string,
    suffix: string,
    contains: string
  ): JSX.Element => {
    const lower = address.toLowerCase();
    const p = prefix.toLowerCase();
    const s = suffix.toLowerCase();
    const c = contains.toLowerCase();

    const matches = [];
    let i = 0;

    if (p && lower.startsWith(`0x${p}`)) {
      matches.push(
        <span key="prefix" className="text-[var(--color-accent)] font-semibold">
          {address.slice(0, 2 + p.length)}
        </span>
      );
      i = 2 + p.length;
    }

    const containsIndex = c ? lower.indexOf(c, i) : -1;
    if (containsIndex !== -1 && containsIndex >= i) {
      if (containsIndex > i) {
        matches.push(
          <span key="pre-contains">{address.slice(i, containsIndex)}</span>
        );
      }
      matches.push(
        <span key="contains" className="text-yellow-400 font-semibold">
          {address.slice(containsIndex, containsIndex + c.length)}
        </span>
      );
      i = containsIndex + c.length;
    }

    const suffixIndex = s ? lower.length - s.length : lower.length;
    if (i < suffixIndex) {
      matches.push(<span key="mid">{address.slice(i, suffixIndex)}</span>);
      i = suffixIndex;
    }

    if (s && lower.endsWith(s)) {
      matches.push(
        <span key="suffix" className="text-green-400 font-semibold">
          {address.slice(-s.length)}
        </span>
      );
    }

    return <>{matches}</>;
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Starts with"
          value={prefix}
          onChange={(e) =>
            setPrefix(e.target.value.replace(/[^0-9a-fA-F]/g, ""))
          }
          className="bg-[var(--color-surface)] text-[var(--color-text-primary)] px-4 py-2 rounded-lg placeholder-[var(--color-text-secondary)] focus:outline-none"
        />
        <input
          type="text"
          placeholder="Contains"
          value={contains}
          onChange={(e) =>
            setContains(e.target.value.replace(/[^0-9a-fA-F]/g, ""))
          }
          className="bg-[var(--color-surface)] text-[var(--color-text-primary)] px-4 py-2 rounded-lg placeholder-[var(--color-text-secondary)] focus:outline-none"
        />
        <input
          type="text"
          placeholder="Ends with"
          value={suffix}
          onChange={(e) =>
            setSuffix(e.target.value.replace(/[^0-9a-fA-F]/g, ""))
          }
          className="bg-[var(--color-surface)] text-[var(--color-text-primary)] px-4 py-2 rounded-lg placeholder-[var(--color-text-secondary)] focus:outline-none"
        />
      </div>

      <label className="flex items-center gap-2 mb-6 text-[var(--color-text-secondary)]">
        <input
          type="checkbox"
          checked={useSeedPhrase}
          onChange={() => setUseSeedPhrase((v) => !v)}
        />
        Generate Seed Phrase
      </label>

      <button
        onClick={() => {
          abortRef.current.abort = true;
          setTimeout(() => generateVanityAddress(), 50);
        }}
        disabled={loading}
        className="bg-[var(--color-accent)] cursor-pointer text-black font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading
          ? "Generating..."
          : `Generate ${useSeedPhrase ? "Seed Phrase" : "Private Key"}`}
      </button>

      {address && (
        <div className="mt-8 w-full max-w-xl bg-[var(--color-surface)] p-5 rounded-xl space-y-4 text-[var(--color-text-primary)]">
          {generatedType === "mnemonic" && (
            <div>
              <h2 className="text-lg font-semibold">Seed Phrase</h2>
              <p className="break-words text-sm text-[var(--color-accent)]">
                {mnemonic}
              </p>
            </div>
          )}
          {generatedType === "privateKey" && (
            <div>
              <h2 className="text-lg font-semibold">Private Key</h2>
              <p className="break-all text-sm text-green-400">{privateKey}</p>
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold">ETH Address</h2>
            <p className="break-all text-sm">
              {highlightAddressParts(
                address,
                generatedHighlight.prefix,
                generatedHighlight.suffix,
                generatedHighlight.contains
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
