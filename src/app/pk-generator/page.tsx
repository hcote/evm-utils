"use client";

import { useState, useRef, JSX } from "react";
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

export default function Page() {
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [contains, setContains] = useState("");
  const [useSeedPhrase, setUseSeedPhrase] = useState(false);
  const [loading, setLoading] = useState(false);
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
    abortRef.current.abort = false;
    const startTime = Date.now();

    setTimeout(async () => {
      const batchSize = 100;
      let foundMatch = false;

      while (Date.now() - startTime < timeoutMs) {
        if (abortRef.current.abort) break;

        for (let i = 0; i < batchSize; i++) {
          if (useSeedPhrase) {
            const m = await bip39.generateMnemonic();
            const account = await mnemonicToAccount(m);
            if (matchesVanity(account.address, prefix, suffix, contains)) {
              setMnemonic(m);
              setPrivateKey(null);
              setAddress(account.address);
              setGeneratedType("mnemonic");
              setGeneratedHighlight({ prefix, suffix, contains });
              foundMatch = true;
              break;
            }
          } else {
            const pk = generatePrivateKey();
            const account = privateKeyToAccount(pk);
            if (matchesVanity(account.address, prefix, suffix, contains)) {
              setPrivateKey(pk);
              setMnemonic(null);
              setAddress(account.address);
              setGeneratedType("privateKey");
              setGeneratedHighlight({ prefix, suffix, contains });
              foundMatch = true;
              break;
            }
          }
        }

        if (foundMatch) {
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
        <span key="prefix" className="text-[#889cff] font-semibold">
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
        <span key="contains" className="text-red-400 font-semibold">
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

    return <span className="font-mono">{matches}</span>;
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
        <div className="flex items-center gap-2">
          <input
            id="useSeedPhrase"
            type="checkbox"
            checked={useSeedPhrase}
            onChange={() => setUseSeedPhrase((v) => !v)}
            className="accent-[var(--color-bg)] cursor-pointer"
          />
          <label
            htmlFor="useSeedPhrase"
            className=" cursor-pointer text-sm text-[var(--color-text-secondary)]"
          >
            Generate Seed Phrase
          </label>
        </div>

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
          loading
            ? "Generating..."
            : `Generate ${useSeedPhrase ? "Seed Phrase" : "Private Key"}`
        }
        onClick={() => {
          abortRef.current.abort = true;
          setTimeout(() => {
            abortRef.current.abort = false;
            generateVanityAddress();
          }, 50);
        }}
        expand
        disabled={loading}
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
                    className: "text-[#939699]",
                  }
                : null,
              generatedType === "privateKey" && privateKey
                ? {
                    header: "Private Key",
                    text: privateKey,
                    className: "text-[#939699]",
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
