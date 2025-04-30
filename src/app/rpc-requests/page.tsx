"use client";

import { useState } from "react";
import { createPublicClient, http } from "viem";
import { RPC_METHODS, RpcParameter } from "@/constants/rpc-methods";
import { NETWORKS } from "@/constants/networks";
import Container from "@/ui/Container";
import Button from "@/ui/Button";
import TextInput from "@/ui/TextInput";
import DropdownMenu from "@/ui/DropdownMenu";

type InputsState = Record<string, Record<string, string>>;
type ResultsState = Record<string, unknown>;

export default function Page() {
  const [inputs, setInputs] = useState<InputsState>({});
  const [results, setResults] = useState<ResultsState>({});
  const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS[0]);
  const [client, setClient] = useState<any>(
    createPublicClient({ chain: NETWORKS[0].chain, transport: http() })
  );

  const handleNetworkChange = (network: (typeof NETWORKS)[number]) => {
    setSelectedNetwork(network);
    setClient(
      createPublicClient({ chain: network.chain as any, transport: http() })
    );
  };

  const handleInputChange = (
    method: string,
    paramName: string,
    value: string
  ) => {
    setInputs((prev) => ({
      ...prev,
      [method]: {
        ...(prev[method] || {}),
        [paramName]: value,
      },
    }));
  };

  const parseInputValue = (type: RpcParameter["type"], value: string) => {
    if (type === "boolean") return value === "true";
    if (type === "object") {
      try {
        return JSON.parse(value);
      } catch {
        return {};
      }
    }
    return value;
  };

  const handleCall = async (method: string, parameters: RpcParameter[]) => {
    try {
      const params = parameters.map((param) =>
        parseInputValue(param.type, inputs[method]?.[param.name] ?? "")
      );

      const result = await client.request({
        method: method as any,
        params: params as any,
      });

      setResults((prev) => ({ ...prev, [method]: result }));
    } catch (error) {
      if (error instanceof Error) {
        setResults((prev) => ({
          ...prev,
          [method]: `Error: ${(error as Error).message}`,
        }));
      } else {
        setResults((prev) => ({ ...prev, [method]: "Unknown error" }));
      }
    }
  };

  return (
    <div className="px-8 py-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-end">
        <DropdownMenu
          selected={selectedNetwork}
          options={NETWORKS}
          onSelect={handleNetworkChange}
        />
      </div>

      <div className="grid gap-4">
        {RPC_METHODS.map(({ method, description, parameters }) => (
          <Container key={method} size="full">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-1">
                <div className="font-semibold text-[var(--color-text-primary)]">
                  {method}
                </div>
                <div className="text-xs text-[var(--color-text-secondary)]">
                  {description}
                </div>
              </div>
              <Button
                label="Call"
                onClick={() => handleCall(method, parameters)}
              />
            </div>

            {parameters.length > 0 && (
              <div className="space-y-3 mb-4">
                {parameters.map(
                  ({ name, type, description, default: defaultValue }) => (
                    <div key={name}>
                      <TextInput
                        label={`${name} (${type})`}
                        placeholder={description}
                        value={inputs[method]?.[name] ?? defaultValue ?? ""}
                        onChange={(e) =>
                          handleInputChange(method, name, e.target.value)
                        }
                      />
                    </div>
                  )
                )}
              </div>
            )}

            {results[method] !== undefined && (
              <div className="mt-2 text-xs text-[var(--color-text-secondary)] whitespace-pre-wrap break-words">
                {JSON.stringify(results[method], null, 2)}
              </div>
            )}
          </Container>
        ))}
      </div>
    </div>
  );
}
