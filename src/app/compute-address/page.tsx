"use client";

import { useState, useRef, JSX } from "react";
import Button from "@/ui/Button";
import Container from "@/ui/Container";
import ResultDisplay from "@/ui/ResultDisplay";
import TextInput from "@/ui/TextInput";
import { isAddress, getContractAddress } from "viem/utils";

export default function Page() {
  const [walletAddress, setWalletAddress] = useState("");
  const [nonce, setNonce] = useState("");
  const [generatedNonce, setGeneratedNonce] = useState<string | null>(null);
  const [startingNonce, setStartingNonce] = useState("0");
  const [prefix, setPrefix] = useState("");
  const [contains, setContains] = useState("");
  const [suffix, setSuffix] = useState("");
  const [contractAddress, setContractAddress] = useState<string | null>(null);
  const [usedPrefix, setUsedPrefix] = useState("");
  const [usedContains, setUsedContains] = useState("");
  const [usedSuffix, setUsedSuffix] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<"single" | "search">("single");
  const [loading, setLoading] = useState(false);
  const abortRef = useRef({ abort: false });

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

    const highlights: JSX.Element[] = [];
    let remaining = address;

    if (p && lower.startsWith(`0x${p}`)) {
      const prefixLen = 2 + p.length;
      highlights.push(
        <span key="prefix" className="text-[var(--color-purple)] font-semibold">
          {remaining.slice(0, prefixLen)}
        </span>
      );
      remaining = remaining.slice(prefixLen);
    }

    const lowerRem = remaining.toLowerCase();
    const containsIndex = c ? lowerRem.indexOf(c) : -1;
    if (containsIndex !== -1) {
      if (containsIndex > 0) {
        highlights.push(
          <span key="pre-contains">{remaining.slice(0, containsIndex)}</span>
        );
      }
      highlights.push(
        <span key="contains" className="text-red-400 font-semibold">
          {remaining.slice(containsIndex, containsIndex + c.length)}
        </span>
      );
      remaining = remaining.slice(containsIndex + c.length);
    }

    const lowerRem2 = remaining.toLowerCase();
    if (s && lowerRem2.endsWith(s)) {
      const suffixStart = remaining.length - s.length;
      if (suffixStart > 0) {
        highlights.push(
          <span key="mid">{remaining.slice(0, suffixStart)}</span>
        );
      }
      highlights.push(
        <span key="suffix" className="text-green-400 font-semibold">
          {remaining.slice(suffixStart)}
        </span>
      );
    } else {
      highlights.push(<span key="rest">{remaining}</span>);
    }

    return <span className="font-mono">{highlights}</span>;
  };

  const handleGenerate = () => {
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

    try {
      const result = getContractAddress({
        from: walletAddress as `0x${string}`,
        nonce: BigInt(nonceInt),
      });

      setContractAddress(result);
      setGeneratedNonce(nonce);
      setUsedPrefix(prefix);
      setUsedContains(contains);
      setUsedSuffix(suffix);
    } catch {
      setError("Failed to compute contract address.");
    }
  };

  const handleSearch = async () => {
    setError(null);
    setContractAddress(null);

    if (!isAddress(walletAddress)) {
      setError("Invalid wallet address.");
      return;
    }

    const start = parseInt(startingNonce || "0");
    if (isNaN(start) || start < 0) {
      setError("Starting nonce must be a valid non-negative number.");
      return;
    }

    setLoading(true);
    abortRef.current.abort = false;

    const maxAttempts = 1000;
    for (let i = start; i < start + maxAttempts; i++) {
      if (abortRef.current.abort) break;

      const candidate = getContractAddress({
        from: walletAddress as `0x${string}`,
        nonce: BigInt(i),
      });

      if (matchesVanity(candidate, prefix, suffix, contains)) {
        setContractAddress(candidate);
        setGeneratedNonce(i.toString());
        setUsedPrefix(prefix);
        setUsedContains(contains);
        setUsedSuffix(suffix);
        setLoading(false);
        return;
      }

      await new Promise((res) => setTimeout(res, 0));
    }

    setLoading(false);
    if (!abortRef.current.abort)
      alert("No matching address found in next 1000 nonces.");
  };

  return (
    <Container>
      <TextInput
        label="Deployer Address"
        placeholder="Deployer address"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
      />

      {searchMode === "single" && (
        <TextInput
          label="Nonce"
          placeholder="Nonce"
          value={nonce}
          onChange={(e) => setNonce(e.target.value)}
        />
      )}

      {searchMode === "search" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          <TextInput
            label="Starts with"
            placeholder="Prefix"
            value={prefix}
            onChange={(e) =>
              setPrefix(e.target.value.replace(/[^0-9a-fA-F]/g, ""))
            }
          />
          <TextInput
            label="Contains"
            placeholder="Contains"
            value={contains}
            onChange={(e) =>
              setContains(e.target.value.replace(/[^0-9a-fA-F]/g, ""))
            }
          />
          <TextInput
            label="Ends with"
            placeholder="Suffix"
            value={suffix}
            onChange={(e) =>
              setSuffix(e.target.value.replace(/[^0-9a-fA-F]/g, ""))
            }
          />
          <TextInput
            label="Starting Nonce"
            placeholder="Start nonce"
            value={startingNonce}
            onChange={(e) =>
              setStartingNonce(e.target.value.replace(/\D/g, ""))
            }
          />
        </div>
      )}

      <div className="mb-4 flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
          <input
            type="checkbox"
            checked={searchMode === "search"}
            onChange={() =>
              setSearchMode((prev) => (prev === "single" ? "search" : "single"))
            }
            className="accent-[var(--color-bg)]"
          />
          Search for vanity contract address
        </label>
        <Button
          label="Clear Form"
          variant="inverse"
          size="sm"
          onClick={() => {
            setPrefix("");
            setSuffix("");
            setContains("");
            setStartingNonce("0");
            setWalletAddress("");
          }}
          className={
            prefix ||
            suffix ||
            contains ||
            (startingNonce && startingNonce !== "0") ||
            walletAddress
              ? "opacity-100 visible pointer-events-auto"
              : "opacity-0 invisible pointer-events-none"
          }
        />
      </div>

      <div className="mt-4">
        <Button
          expand
          label={loading ? "Searching..." : "Generate Address"}
          onClick={() => {
            abortRef.current.abort = true;
            setTimeout(() => {
              abortRef.current.abort = false;
              searchMode === "search" ? handleSearch() : handleGenerate();
            }, 50);
          }}
          disabled={loading || !walletAddress}
        />
      </div>

      {error && (
        <p className="text-sm text-[var(--color-text-error)] pt-2">{error}</p>
      )}

      {contractAddress && (
        <ResultDisplay
          wrapPreText
          items={[
            {
              header: "Contract Address",
              text: highlightAddressParts(
                contractAddress,
                usedPrefix,
                usedSuffix,
                usedContains
              ),
              className: "break-all",
            },
            {
              header: "Nonce",
              text: generatedNonce ?? "",
            },
          ]}
        />
      )}
    </Container>
  );
}
