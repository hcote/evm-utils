import IcoCompute from "@/icons/IcoCompute";
import IcoContractReader from "@/icons/IcoContractReader";
import IcoDecoder from "@/icons/IcoDecoder";
import IcoENS from "@/icons/IcoENS";
import IcoKeyGen from "@/icons/IcoKeyGen";
import IcoMetadata from "@/icons/IcoMetadata";
import IcoRpcRequest from "@/icons/IcoRpcRequest";
import IcoUnits from "@/icons/IcoUnits";

interface Navigation {
  name: string;
  path: string;
  description: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement> & {
    color?: string;
    size?: number;
    className?: string;
  }>;
}

export const NAVIGATION: Navigation[] = [
  {
    name: "ETH Unit Converter",
    path: "/unit-converter",
    description: "Convert between Wei, Gwei, and ETH units.",
    Icon: IcoUnits,
  },
  {
    name: "Private Key Generator",
    path: "/pk-generator",
    description: "Generate a random EVM private key and address, with support for vanity prefixes or suffixes.",
    Icon: IcoKeyGen,
  },
  {
    name: "Transaction Decoder",
    path: "/decoder",
    description: "Decode a raw EVM transaction to view its contents.",
    Icon: IcoDecoder,
  },
  {
    name: "JSON RPC Methods",
    path: "/rpc-requests",
    description: "Interact with Ethereum nodes using JSON RPC methods.",
    Icon: IcoRpcRequest,
  },
  {
    name: "Contract Reader",
    path: "/contract-reader",
    description: "Read data from any Ethereum smart contract.",
    Icon: IcoContractReader,
  },
  {
    name: "NFT Metadata",
    path: "/nft",
    description: "Fetch and display metadata for any ERC-721 token.",
    Icon: IcoMetadata,
  },
  {
    name: "ENS Lookup",
    path: "/ens",
    description: "Resolve Ethereum Name Service domains to addresses and vice versa.",
    Icon: IcoENS
  },
  {
    name: "Compute Contract Address",
    path: "/compute-address",
    description: "Calculate the address of a contract from a deployer address.",
    Icon: IcoCompute
  },
];

