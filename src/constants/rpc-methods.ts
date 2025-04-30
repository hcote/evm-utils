export interface RpcParameter {
  name: string;
  type: "string" | "boolean" | "object";
  description: string;
  default?: string;
}

interface RpcMethod {
  method: string;
  description: string;
  parameters: RpcParameter[];
}

export const RPC_METHODS: RpcMethod[] = [
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
  {
    method: "eth_blockNumber",
    description: "Returns the number of the most recent block",
    parameters: [],
  },
  {
    method: "eth_getBalance",
    description: "Returns the balance of the account of given address",
    parameters: [
      { name: "address", type: "string", description: "address" },
      {
        name: "blockParameter",
        type: "string",
        description: "Block number in hex or keyword",
        default: "latest",
      },
    ],
  },
  {
    method: "eth_getTransactionCount",
    description: "Returns number of transactions sent from an address",
    parameters: [
      { name: "address", type: "string", description: "address" },
      {
        name: "blockParameter",
        type: "string",
        description: "Block number in hex or keyword",
        default: "latest",
      },
    ],
  },
  {
    method: "eth_getTransactionByHash",
    description: "Returns information about a transaction by transaction hash",
    parameters: [
      {
        name: "transactionHash",
        type: "string",
        description: "transaction hash",
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
        description: "transaction hash",
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
        default: "latest",
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
    method: "eth_getCode",
    description: "Returns code at a given address",
    parameters: [
      { name: "address", type: "string", description: "address" },
      {
        name: "blockParameter",
        type: "string",
        description: "Block number in hex or keyword",
        default: "latest",
      },
    ],
  },
];
