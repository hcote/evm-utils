import { useState, useEffect } from "react";
import { createPublicClient, http, PublicClient } from "viem";
import { NETWORKS } from "@/constants/networks";
import { getPublicClient } from "@/utils/viemPublicClient";

export function useNetworkSelection() {
  const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS[0]);
  const [customRpcUrl, setCustomRpcUrl] = useState("");
  const [client, setClient] = useState<PublicClient | null>(() =>
    NETWORKS[0].chain ? getPublicClient(NETWORKS[0].chain) : null
  );

  // Load network from localStorage on mount
  useEffect(() => {
    const savedNetworkName = localStorage.getItem("selectedNetwork");
    const savedCustomRpcUrl = localStorage.getItem("customRpcUrl");

    if (savedNetworkName) {
      const network = NETWORKS.find((n) => n.name === savedNetworkName);
      if (network) {
        setSelectedNetwork(network);
        if (network.name === "Custom" && savedCustomRpcUrl) {
          setCustomRpcUrl(savedCustomRpcUrl);
          try {
            const customClient = createPublicClient({
              transport: http(savedCustomRpcUrl),
            });
            setClient(customClient);
          } catch (err) {
            console.error("Failed to restore custom RPC", err);
          }
        } else if (network.chain) {
          setClient(getPublicClient(network.chain));
        }
      }
    }
  }, []);

  const handleNetworkChange = (network: (typeof NETWORKS)[number]) => {
    setSelectedNetwork(network);
    localStorage.setItem("selectedNetwork", network.name);
    if (network.chain) {
      setClient(getPublicClient(network.chain));
    }
    if (network.name !== "Custom") {
      setCustomRpcUrl("");
      localStorage.removeItem("customRpcUrl");
    }
  };

  const handleCustomRpcUrlChange = (url: string) => {
    setCustomRpcUrl(url);
    localStorage.setItem("customRpcUrl", url);
    if (url) {
      try {
        const customClient = createPublicClient({
          transport: http(url),
        });
        setClient(customClient);
      } catch (err) {
        console.error("Invalid RPC URL", err);
      }
    }
  };

  return {
    selectedNetwork,
    customRpcUrl,
    client,
    handleNetworkChange,
    handleCustomRpcUrlChange,
  };
}

