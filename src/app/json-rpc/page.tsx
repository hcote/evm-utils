"use client";

import { useState } from "react";
import Container from "@/ui/Container";
import Button from "@/ui/Button";
import TextArea from "@/ui/TextArea";
import { useNetworkSelection } from "@/hooks/use-network-selection";
import NetworkSelector from "@/components/NetworkSelector";
import Text from "@/ui/Text";
import ResultDisplay from "@/ui/ResultDisplay";

interface RpcPayload {
  jsonrpc: string;
  method: string;
  params: unknown[];
  id: number;
}

const getExamplePayload = (method: string): RpcPayload => {
  const examples: Record<string, RpcPayload> = {
    eth_chainId: {
      jsonrpc: "2.0",
      method: "eth_chainId",
      params: [],
      id: 1,
    },
    eth_getBalance: {
      jsonrpc: "2.0",
      method: "eth_getBalance",
      params: ["0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", "latest"],
      id: 1,
    },
    eth_gasPrice: {
      jsonrpc: "2.0",
      method: "eth_gasPrice",
      params: [],
      id: 1,
    },
    eth_maxPriorityFeePerGas: {
      jsonrpc: "2.0",
      method: "eth_maxPriorityFeePerGas",
      params: [],
      id: 1,
    },
    eth_estimateGas: {
      jsonrpc: "2.0",
      method: "eth_estimateGas",
      params: [
        {
          from: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
          to: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
          data: "0x",
        },
      ],
      id: 1,
    },
    eth_blockNumber: {
      jsonrpc: "2.0",
      method: "eth_blockNumber",
      params: [],
      id: 1,
    },
    eth_getBlockByNumber: {
      jsonrpc: "2.0",
      method: "eth_getBlockByNumber",
      params: ["latest", false],
      id: 1,
    },
    eth_getTransactionByHash: {
      jsonrpc: "2.0",
      method: "eth_getTransactionByHash",
      params: [
        "0x96b1b180d22dae2b18a783ebdd5ae33f6867f3572f87c69a135c6c0a15a63c8e",
      ],
      id: 1,
    },
    eth_getTransactionReceipt: {
      jsonrpc: "2.0",
      method: "eth_getTransactionReceipt",
      params: [
        "0x96b1b180d22dae2b18a783ebdd5ae33f6867f3572f87c69a135c6c0a15a63c8e",
      ],
      id: 1,
    },
    eth_getTransactionCount: {
      jsonrpc: "2.0",
      method: "eth_getTransactionCount",
      params: ["0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", "latest"],
      id: 1,
    },
    eth_getCode: {
      jsonrpc: "2.0",
      method: "eth_getCode",
      params: ["0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72", "latest"],
      id: 1,
    },
    eth_call: {
      jsonrpc: "2.0",
      method: "eth_call",
      params: [
        {
          data: "0x0667cfea000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000d07766974616c696b03657468000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000243b3b57deee6c4522aab0003e8d14cd40a6af439055fd2577951148c14b6cea9a5347583500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000014782d62617463682d676174657761793a74727565000000000000000000000000",
          to: "0xce01f8eee7E479C928F8919abD53E553a36CeF67",
        },
        "latest",
      ],
      id: 1,
    },
    custom: {
      jsonrpc: "2.0",
      method: "your_method_here",
      params: [],
      id: 1,
    },
  };

  return examples[method] || { jsonrpc: "2.0", method, params: [], id: 1 };
};

export default function Page() {
  const [payload, setPayload] = useState(
    JSON.stringify(getExamplePayload("eth_chainId"), null, 2)
  );
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    selectedNetwork,
    customRpcUrl,
    client,
    handleNetworkChange,
    handleCustomRpcUrlChange,
  } = useNetworkSelection();

  const handleMethodClick = (method: string) => {
    const example = getExamplePayload(method);
    setPayload(JSON.stringify(example, null, 2));
    setResult(null);
    setError("");
  };

  const handleExecute = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      if (!client) throw new Error("Client not initialized");

      const parsedPayload = JSON.parse(payload);
      const { method, params } = parsedPayload;

      const response = await client.request({
        method: method as any,
        params: params as any,
      });

      setResult(response);
    } catch (err: any) {
      setError(err.message || "Error executing RPC request");
    } finally {
      setLoading(false);
    }
  };

  // Most common methods to display as buttons
  const commonMethods = [
    "eth_chainId",
    "eth_getBalance",
    "eth_gasPrice",
    "eth_maxPriorityFeePerGas",
    "eth_estimateGas",
    "eth_blockNumber",
    "eth_getBlockByNumber",
    "eth_getTransactionByHash",
    "eth_getTransactionReceipt",
    "eth_getTransactionCount",
    "eth_getCode",
    "eth_call",
    "custom",
  ];

  return (
    <Container>
      <NetworkSelector
        selectedNetwork={selectedNetwork}
        customRpcUrl={customRpcUrl}
        onNetworkChange={handleNetworkChange}
        onCustomRpcUrlChange={handleCustomRpcUrlChange}
      />

      <div className="space-y-4">
        <div>
          <Text
            text="Common RPC Methods"
            variant="secondary"
            size="sm"
            className="mb-2"
          />
          <div className="flex flex-wrap gap-2">
            {commonMethods.map((method) => (
              <button
                key={method}
                onClick={() => handleMethodClick(method)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors bg-[var(--color-bg)] text-[var(--color-text-primary)] border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)] hover:border-[var(--color-accent)] cursor-pointer`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Text
            text="JSON-RPC Payload"
            variant="secondary"
            size="sm"
            className="mb-2"
          />
          <TextArea
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            autoResize={true}
            minRows={6}
            placeholder="Enter JSON-RPC payload..."
            className="font-mono text-sm"
          />
        </div>

        <Button
          label={loading ? "Executing..." : "Execute"}
          onClick={handleExecute}
          disabled={loading || !payload}
          expand
        />

        {error && <Text variant="error" text={error} size="sm" />}

        {result !== null && (
          <ResultDisplay
            wrapPreText={true}
            items={[
              {
                header: "Response:",
                text: JSON.stringify(result, null, 2),
                className: "text-sm leading-relaxed font-mono",
              },
            ]}
          />
        )}
      </div>
    </Container>
  );
}
