import IcoArbitrum from "@/icons/IcoArbitrum";
import IcoBase from "@/icons/IcoBase";
import IcoEthereum from "@/icons/IcoEthereum";
import IcoOptimism from "@/icons/IcoOptimism";
import IcoPolygon from "@/icons/IcoPolygon";
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from "viem/chains";

interface Network {
  name: string;
  chain: any;
  Icon: React.FC<React.SVGProps<SVGSVGElement> & {
    color?: string;
    size?: number;
    className?: string;
  }>;
}

export const NETWORKS: Network[] = [
  { name: "Mainnet", chain: mainnet, Icon: IcoEthereum },
  { name: "Base", chain: base, Icon: IcoBase },
  { name: "Optimism", chain: optimism, Icon: IcoOptimism },
  { name: "Arbitrum", chain: arbitrum, Icon: IcoArbitrum },
  { name: "Polygon", chain: polygon, Icon: IcoPolygon },
  { name: "Eth Sepolia", chain: sepolia, Icon: IcoEthereum },
];