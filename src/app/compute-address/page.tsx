"use client";

import { useState } from "react";
import Button from "@/ui/Button";
import Container from "@/ui/Container";
import ResultDisplay from "@/ui/ResultDisplay";
import TextInput from "@/ui/TextInput";
import { isAddress, getContractAddress } from "viem/utils";
import { matchesSearch } from "@/utils/matchesSearch";
import { highlightAddressParts } from "@/utils/highlightAddressParts";
import VanitySearchFields from "@/components/VanitySearchFields";
import CheckBox from "@/ui/Checkbox";
import Text from "@/ui/Text";

export default function Page() {
  const [walletAddress, setWalletAddress] = useState("");
  const [nonce, setNonce] = useState("0");

  const [loading, setLoading] = useState(false);

  const [prefix, setPrefix] = useState("");
  const [contains, setContains] = useState("");
  const [suffix, setSuffix] = useState("");

  const [generatedNonce, setGeneratedNonce] = useState<string | null>(null);
  const [contractAddress, setContractAddress] = useState<string | null>(null);

  const [usedSearch, setUsedSearch] = useState({
    prefix: "",
    contains: "",
    suffix: "",
  });

  const [isSearchMode, setIsSearchMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const MAX_SEARCH_ATTEMPTS = 1000;

  const showClearFormButton =
    walletAddress || prefix || suffix || contains || (nonce && nonce !== "0");

  const clearForm = () => {
    setPrefix("");
    setSuffix("");
    setContains("");
    setNonce("0");
    setWalletAddress("");
  };

  const validateInputs = (walletAddress: string, nonce: number): boolean => {
    if (!isAddress(walletAddress)) {
      setError("Invalid wallet address.");
      return false;
    }

    if (isNaN(nonce) || nonce < 0) {
      setError("Invalid nonce.");
      return false;
    }

    return true;
  };

  const handleComputeAddress = () => {
    setError(null);

    const nonceNum = Number(nonce);
    const valid = validateInputs(walletAddress, nonceNum);
    if (!valid) return;

    try {
      const result = getContractAddress({
        from: walletAddress as `0x${string}`,
        nonce: BigInt(nonceNum),
      });

      setContractAddress(result);
      setGeneratedNonce(nonce || "0");
    } catch {
      setError("Failed to compute contract address.");
    }
  };

  const handleSearch = async () => {
    setError(null);
    setContractAddress(null);

    const nonceNum = Number(nonce);
    const valid = validateInputs(walletAddress, nonceNum);
    if (!valid) return;

    setLoading(true);

    for (let i = nonceNum; i < nonceNum + MAX_SEARCH_ATTEMPTS; i++) {
      const candidate = getContractAddress({
        from: walletAddress as `0x${string}`,
        nonce: BigInt(i),
      });

      if (matchesSearch(candidate, prefix, suffix, contains)) {
        setContractAddress(candidate);
        setGeneratedNonce(i.toString());
        setUsedSearch({ prefix, contains, suffix });
        setLoading(false);
        return;
      }
    }

    setLoading(false);
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

      {isSearchMode ? (
        <VanitySearchFields
          prefix={prefix}
          setPrefix={setPrefix}
          contains={contains}
          setContains={setContains}
          suffix={suffix}
          setSuffix={setSuffix}
          startingNonce={nonce}
          setStartingNonce={setNonce}
        />
      ) : (
        <TextInput
          label="Nonce"
          placeholder="Nonce"
          value={nonce}
          onChange={(e) => setNonce(e.target.value)}
        />
      )}

      <div className="mb-4 flex items-center justify-between">
        <CheckBox
          text="Search for vanity contract address"
          isChecked={isSearchMode}
          setIsChecked={() => setIsSearchMode((prev) => !prev)}
        />
        <Button
          label="Clear Form"
          variant="inverse"
          size="sm"
          onClick={clearForm}
          className={
            showClearFormButton
              ? "opacity-100 visible pointer-events-auto"
              : "opacity-0 invisible pointer-events-none"
          }
        />
      </div>

      <div className="mt-4">
        <Button
          expand
          label={loading ? "Searching..." : "Generate Address"}
          onClick={isSearchMode ? handleSearch : handleComputeAddress}
          disabled={loading || !walletAddress}
        />
      </div>

      {error && <Text variant="error" text={error} className="pt-2" />}

      {contractAddress && (
        <ResultDisplay
          wrapPreText
          items={[
            {
              header: "Contract Address",
              text: highlightAddressParts(
                contractAddress,
                usedSearch.prefix,
                usedSearch.suffix,
                usedSearch.contains
              ),
              className: "break-all",
            },
            {
              header: "Nonce",
              text: generatedNonce ?? "0",
            },
          ]}
        />
      )}
    </Container>
  );
}
