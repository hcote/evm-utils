import { NETWORKS } from "@/constants/networks";
import DropdownMenu from "@/ui/DropdownMenu";
import TextInput from "@/ui/TextInput";

interface NetworkSelectorProps {
  selectedNetwork: (typeof NETWORKS)[number];
  customRpcUrl: string;
  onNetworkChange: (network: (typeof NETWORKS)[number]) => void;
  onCustomRpcUrlChange: (url: string) => void;
}

export default function NetworkSelector({
  selectedNetwork,
  customRpcUrl,
  onNetworkChange,
  onCustomRpcUrlChange,
}: NetworkSelectorProps) {
  return (
    <div className="flex justify-end items-center gap-2">
      <DropdownMenu
        selected={selectedNetwork}
        options={NETWORKS}
        onSelect={onNetworkChange}
      />
      {selectedNetwork.name === "Custom" && (
        <TextInput
          placeholder="Custom RPC URL"
          value={customRpcUrl}
          size="sm"
          onChange={(e) => onCustomRpcUrlChange(e.target.value)}
        />
      )}
    </div>
  );
}
