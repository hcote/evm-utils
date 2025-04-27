"use client";

import { useState } from "react";
import { client } from "@/utils/viemPublicClient";
import type { PublicClient } from "viem";

interface RpcParameter {
  name: string;
  type: "string" | "boolean" | "object";
  description: string;
}

interface RpcMethod {
  method: string;
  description: string;
  parameters: RpcParameter[];
}

const rpcMethods: RpcMethod[] = [
  {
    method: "eth_blockNumber",
    description: "Returns the number of the most recent block",
    parameters: [],
  },
  {
    method: "eth_getBalance",
    description: "Returns the balance of the account of given address",
    parameters: [
      {
        name: "address",
        type: "string",
        description: "20-byte address to check for balance",
      },
      {
        name: "blockParameter",
        type: "string",
        description: "Block number in hex or keyword",
      },
    ],
  },
  {
    method: "eth_sendTransaction",
    description: "Creates new message call transaction or a contract creation",
    parameters: [
      {
        name: "transactionObject",
        type: "object",
        description: "Transaction details object",
      },
    ],
  },
  {
    method: "eth_call",
    description:
      "Executes a new message call immediately without creating a transaction",
    parameters: [
      {
        name: "callObject",
        type: "object",
        description: "Call details object",
      },
      {
        name: "blockParameter",
        type: "string",
        description: "Block number in hex or keyword",
      },
    ],
  },
  {
    method: "eth_getTransactionByHash",
    description:
      "Returns the information about a transaction by transaction hash",
    parameters: [
      {
        name: "transactionHash",
        type: "string",
        description: "32-byte transaction hash",
      },
    ],
  },
  {
    method: "eth_getTransactionReceipt",
    description: "Returns the receipt of a transaction by transaction hash",
    parameters: [
      {
        name: "transactionHash",
        type: "string",
        description: "32-byte transaction hash",
      },
    ],
  },
  {
    method: "eth_getBlockByNumber",
    description: "Returns information about a block by block number",
    parameters: [
      {
        name: "blockParameter",
        type: "string",
        description: "Block number in hex or keyword",
      },
      {
        name: "returnFullTransactionObjects",
        type: "boolean",
        description: "Return full transactions or not",
      },
    ],
  },
  {
    method: "eth_getBlockByHash",
    description: "Returns information about a block by hash",
    parameters: [
      { name: "blockHash", type: "string", description: "32-byte block hash" },
      {
        name: "returnFullTransactionObjects",
        type: "boolean",
        description: "Return full transactions or not",
      },
    ],
  },
  {
    method: "eth_getCode",
    description: "Returns code at a given address",
    parameters: [
      { name: "address", type: "string", description: "20-byte address" },
      {
        name: "blockParameter",
        type: "string",
        description: "Block number in hex or keyword",
      },
    ],
  },
  {
    method: "eth_estimateGas",
    description: "Generates an estimate of gas needed",
    parameters: [
      {
        name: "callObject",
        type: "object",
        description: "Call details object",
      },
      {
        name: "blockParameter",
        type: "string",
        description: "Block number in hex or keyword",
      },
    ],
  },
  {
    method: "eth_getLogs",
    description: "Returns logs matching a filter",
    parameters: [
      {
        name: "filterObject",
        type: "object",
        description: "Filter options object",
      },
    ],
  },
  {
    method: "eth_getTransactionCount",
    description: "Returns number of transactions sent from an address",
    parameters: [
      { name: "address", type: "string", description: "20-byte address" },
      {
        name: "blockParameter",
        type: "string",
        description: "Block number in hex or keyword",
      },
    ],
  },
  {
    method: "net_version",
    description: "Returns the current network ID",
    parameters: [],
  },
  {
    method: "eth_chainId",
    description: "Returns the chain ID",
    parameters: [],
  },
  {
    method: "eth_gasPrice",
    description: "Returns the current gas price",
    parameters: [],
  },
];

type InputsState = Record<string, Record<string, string>>; // method -> paramName -> value
type ResultsState = Record<string, unknown>;

export default function Page() {
  const [inputs, setInputs] = useState<InputsState>({});
  const [results, setResults] = useState<ResultsState>({});

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
    if (type === "boolean") {
      return value === "true";
    }
    if (type === "object") {
      try {
        return JSON.parse(value);
      } catch {
        return {}; // fallback empty object if invalid
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
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Ethereum JSON-RPC Tester
      </h1>
      <div className="grid gap-6">
        {rpcMethods.map(({ method, description, parameters }) => (
          <div
            key={method}
            className="p-4 rounded-xl border border-white/10 bg-[var(--color-surface)]"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-semibold text-[var(--color-text-primary)]">
                  {method}
                </div>
                <div className="text-sm text-[var(--color-text-secondary)]">
                  {description}
                </div>
              </div>
              <button
                onClick={() => handleCall(method, parameters)}
                className="px-4 py-2 rounded-lg border border-white/20 hover:border-white/30 hover:brightness-110 transition"
              >
                Call
              </button>
            </div>
            {parameters.length > 0 && (
              <div className="grid gap-4 mb-4">
                {parameters.map(({ name, type, description }) => (
                  <div key={name}>
                    <label className="text-sm text-[var(--color-text-primary)]">
                      {name} ({type})
                    </label>
                    <input
                      type="text"
                      placeholder={description}
                      value={inputs[method]?.[name] ?? ""}
                      onChange={(e) =>
                        handleInputChange(method, name, e.target.value)
                      }
                      className="mt-1 w-full px-3 py-2 rounded-md bg-[var(--color-bg)] border border-white/10 text-sm"
                    />
                  </div>
                ))}
              </div>
            )}
            {results[method] !== undefined && (
              <div className="mt-2 text-sm break-all text-[var(--color-text-secondary)] whitespace-pre-wrap">
                Result: {JSON.stringify(results[method], null, 2)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
