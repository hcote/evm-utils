"use client";

import Button from "@/ui/Button";
import Container from "@/ui/Container";
import ResultDisplay from "@/ui/ResultDisplay";
import Text from "@/ui/Text";
import TextArea from "@/ui/TextArea";
import { useState } from "react";
import { isHex } from "viem";

export default function TransactionDecoder() {
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const functionSigLookupUrl = "https://www.4byte.directory/api/v1/signatures/";

  const testData =
    "0xa9059cbb000000000000000000000000448ddf8326d95723f1f700d58ad8095036621108000000000000000000000000000000000000000000000000000000000db58580";

  const fetchFunctionName = async (funcSelector: string) => {
    const res = await fetch(
      `${functionSigLookupUrl}?hex_signature=${funcSelector}`
    );
    const json = await res.json();
    if (!json.results || json.results.length === 0) {
      throw new Error("No function signature found");
    }

    const sorted = json.results.sort((a: any, b: any) => a.id - b.id);
    const selectedSignature = sorted[0];
    return selectedSignature.text_signature;
  };

  const decodeInputData = async (hex: string) => {
    setError(null);

    if (!isHex(hex)) {
      setError("Invalid transaction data");
      return;
    }

    try {
      const funcSelector = hex.slice(0, 10);
      const paramsData = hex.slice(10);
      const functionName = await fetchFunctionName(funcSelector);

      const match = functionName.match(/\(([^)]*)\)/);
      const paramTypes =
        match?.[1]
          ?.split(",")
          .map((s: string) => s.trim())
          .filter(Boolean) || [];

      const chunks =
        paramsData.match(/.{1,64}/g)?.map((chunk) => "0x" + chunk) || [];

      const decodeParam = (param: string, type: string) => {
        switch (type) {
          case "address":
            return "0x" + param.slice(-40);
          case "uint256":
          case "uint":
          case "uint8":
          case "uint64":
            try {
              return BigInt(param).toString();
            } catch {
              return "Invalid uint";
            }
          default:
            return param;
        }
      };

      const decodedParams = chunks.map((param, idx) => {
        const type = paramTypes[idx] || "unknown";
        return {
          type,
          raw: param,
          decoded: decodeParam(param, type),
        };
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

  const handleDecode = () => {
    decodeInputData(input);
  };

  const handleTest = () => {
    setInput(testData);
    decodeInputData(testData);
  };

  return (
    <Container>
      <TextArea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste transaction data (0x...)"
        label="Transaction Data"
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
            <Text text="OR" variant="secondary" size="sm" />
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
        <Text variant="error" text={error} size="sm" className="mb-4" />
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
