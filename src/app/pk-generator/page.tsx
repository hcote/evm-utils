"use client";

import { useState } from "react";
import {
  generatePrivateKey,
  privateKeyToAccount,
  mnemonicToAccount,
} from "viem/accounts";
import * as bip39 from "bip39";
import Container from "@/ui/Container";
import Button from "@/ui/Button";
import TextInput from "@/ui/TextInput";
import ResultDisplay, { ResultItem } from "@/ui/ResultDisplay";
import { highlightAddressParts } from "@/utils/highlightAddressParts";
import { matchesSearch } from "@/utils/matchesSearch";
import CheckBox from "@/ui/Checkbox";

type KeyType = "privateKey" | "mnemonic";

export default function Page() {
  const [address, setAddress] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [mnemonic, setMnemonic] = useState<string | null>(null);

  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [contains, setContains] = useState("");

  const [useSeedPhrase, setUseSeedPhrase] = useState(false);
  const [generatedType, setGeneratedType] = useState<KeyType>("privateKey");

  const [isLoading, setIsLoading] = useState(false);

  const [generatedHighlight, setGeneratedHighlight] = useState({
    prefix: "",
    suffix: "",
    contains: "",
  });

  const MAX_SEARCH_ATTEMPTS = 5000;

  const generateAccount = async () => {
    if (useSeedPhrase) {
      const m = await bip39.generateMnemonic();
      const account = await mnemonicToAccount(m);
      return { account, secret: m, type: "mnemonic" as const };
    } else {
      const pk = generatePrivateKey();
      const account = privateKeyToAccount(pk);
      return { account, secret: pk, type: "privateKey" as const };
    }
  };

  const generateVanityAddress = async () => {
    if (prefix || suffix || contains) {
      setIsLoading(true);
    }

    // Allow UI to update before starting the generation
    // This is a workaround to prevent the UI from freezing
    await new Promise((r) => setTimeout(r, 0));

    for (let i = 0; i < MAX_SEARCH_ATTEMPTS; i++) {
      try {
        const { account, secret, type } = await generateAccount();

        if (matchesSearch(account.address, prefix, suffix, contains)) {
          setAddress(account.address);
          setGeneratedType(type);
          setGeneratedHighlight({ prefix, suffix, contains });

          if (type === "mnemonic") {
            setMnemonic(secret);
            setPrivateKey(null);
          } else {
            setPrivateKey(secret);
            setMnemonic(null);
          }

          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.error("Address generation failed:", err);
      }
    }

    setIsLoading(false);
    alert(`No match found within ${MAX_SEARCH_ATTEMPTS} attempts.`);
  };

  return (
    <Container>
      <div className="relative space-y-3">
        <div className="space-y-1">
          <TextInput
            id="prefix"
            label="Starts with"
            type="text"
            placeholder="Starts with"
            value={prefix}
            onChange={(e) =>
              setPrefix(e.target.value.replace(/[^0-9a-fA-F]/g, ""))
            }
          />
        </div>
        <div className="space-y-1">
          <TextInput
            id="contains"
            label="Contains"
            placeholder="Contains"
            value={contains}
            onChange={(e) =>
              setContains(e.target.value.replace(/[^0-9a-fA-F]/g, ""))
            }
          />
        </div>
        <div className="space-y-1">
          <TextInput
            id="suffix"
            label="Ends with"
            placeholder="Ends with"
            value={suffix}
            onChange={(e) =>
              setSuffix(e.target.value.replace(/[^0-9a-fA-F]/g, ""))
            }
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <CheckBox
          text="Generate Seed Phrase"
          isChecked={useSeedPhrase}
          setIsChecked={() => setUseSeedPhrase((v) => !v)}
        />
        <Button
          label="Clear Form"
          variant="inverse"
          size="sm"
          onClick={() => {
            setPrefix("");
            setSuffix("");
            setContains("");
          }}
          className={
            prefix || suffix || contains
              ? "opacity-100 visible pointer-events-auto"
              : "opacity-0 invisible pointer-events-none"
          }
        />
      </div>

      <Button
        label={
          isLoading
            ? "Generating..."
            : `Generate ${useSeedPhrase ? "Seed Phrase" : "Private Key"}`
        }
        onClick={generateVanityAddress}
        disabled={isLoading}
        expand
      />

      {address && (
        <ResultDisplay
          wrapPreText
          items={
            [
              generatedType === "mnemonic" && mnemonic
                ? {
                    header: "Seed Phrase",
                    text: mnemonic,
                  }
                : null,
              generatedType === "privateKey" && privateKey
                ? {
                    header: "Private Key",
                    text: privateKey,
                  }
                : null,
              {
                header: "ETH Address",
                text: highlightAddressParts(
                  address,
                  generatedHighlight.prefix,
                  generatedHighlight.suffix,
                  generatedHighlight.contains
                ),
                className: "break-all",
              },
            ].filter(Boolean) as ResultItem[]
          }
        />
      )}
    </Container>
  );
}
