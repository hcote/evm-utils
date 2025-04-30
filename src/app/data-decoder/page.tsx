"use client";

import Button from "@/ui/Button";
import Container from "@/ui/Container";
import ResultDisplay from "@/ui/ResultDisplay";
import TextArea from "@/ui/TextArea";
import { useState } from "react";

export default function TransactionDecoder() {
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const decodeInputData = async (hex: string) => {
    setError(null);
    if (!hex.startsWith("0x") || hex.length < 10) {
      setError("Invalid transaction data");
      return;
    }

    try {
      const funcSelector = hex.slice(0, 10);
      const paramsData = hex.slice(10);

      const res = await fetch(
        `https://www.4byte.directory/api/v1/signatures/?hex_signature=${funcSelector}`
      );
      const json = await res.json();

      if (!json.results || json.results.length === 0) {
        throw new Error("No function signature found");
      }

      const sorted = json.results.sort((a: any, b: any) => a.id - b.id);
      const selectedSignature = sorted[0];
      const functionName = selectedSignature.text_signature;

      const paramTypes = functionName
        .substring(functionName.indexOf("(") + 1, functionName.indexOf(")"))
        .split(",")
        .filter((x: string) => x);

      const chunks = [];
      for (let i = 0; i < paramsData.length; i += 64) {
        chunks.push("0x" + paramsData.slice(i, i + 64));
      }

      const decodedParams = chunks.map((param, idx) => {
        const type = paramTypes[idx] || "unknown";
        if (type === "address") {
          return {
            type: "address",
            raw: param,
            decoded: "0x" + param.slice(-40),
          };
        } else if (type.startsWith("uint")) {
          return {
            type: "uint",
            raw: param,
            decoded: BigInt(param).toString(),
          };
        } else {
          return {
            type,
            raw: param,
            decoded: param,
          };
        }
      });

      setDecoded({
        functionSelector: funcSelector,
        functionName,
        parameters: decodedParams,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to decode transaction data");
    }
  };

  const handleDecode = async () => {
    setDecoded(null);
    await decodeInputData(input);
  };

  const handleTest = async () => {
    setDecoded(null);
    setInput("");
    await decodeInputData(
      "0xa9059cbb000000000000000000000000448ddf8326d95723f1f700d58ad8095036621108000000000000000000000000000000000000000000000000000000000db58580"
    );
  };

  return (
    <Container className="space-y-6">
      <TextArea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste transaction data (0x...)"
      />

      <div className="flex flex-col items-center justify-center gap-4">
        <Button
          label="Decode"
          onClick={handleDecode}
          expand
          disabled={!input}
        />

        {!input && (
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
        <div className="text-[var(--color-text-error)] mb-4">{error}</div>
      )}

      {decoded && (
        <ResultDisplay
          items={[
            {
              header: "Function Selector",
              text: decoded.functionSelector,
            },
            {
              header: "Function Name",
              text: decoded.functionName,
            },
            {
              header: "Parameters",
              text: (
                <ol className="list-decimal list-inside space-y-2">
                  {decoded.parameters.map((param: any, idx: number) => (
                    <li key={idx}>
                      <div className="break-all">
                        <p>
                          <strong>Type:</strong> {param.type}
                        </p>
                        <p>
                          <strong>Raw:</strong> {param.raw}
                        </p>
                        <p>
                          <strong>Decoded:</strong> {param.decoded}
                          {param.type === "uint" && " (wei)"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              ),
            },
          ]}
        />
      )}
    </Container>
  );
}
