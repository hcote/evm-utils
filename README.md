### EVM Utils

https://evmutils.com

This is a Next.js / viem web app that providers helper functions for EVM builders. It includes:

#### ETH Unit Converter

Convert between Wei, Gwei, and ETH units.

#### Private Key Generator

Generate a random EVM private key and address, with support for vanity prefixes or suffixes.

#### Transaction Decoder

Decode a raw EVM transaction to view its contents.

#### NFT Metadata

Fetch and display metadata for any ERC-721 token.

#### ENS Lookup

Resolve Ethereum Name Service domains to addresses.

#### Compute Contract Address

Calculate the deployed-at address for a smart contract given a deployer address.

#### Data Decoder

Make transaction data human-readable.

#### JSON RPC

Send JSON RPC requests to EVM nodes.

#### Contract Reader

Read data from any Ethereum smart contract.

##### Coming Soon

- Explainer on EVM network fees, what makes them up and how they are calculated

##### App Tree
<pre>
.
├── public
└── src
    ├── abis
    ├── app
    │   ├── api
    │   │   ├── eth-price
    │   │   └── gas-price
    │   ├── compute-address
    │   ├── data-decoder
    │   ├── ens
    │   ├── nft
    │   ├── pk-generator
    │   ├── tx-decoder
    │   └── unit-converter
    ├── components
    ├── constants
    ├── contexts
    ├── hooks
    ├── icons
    ├── ui
    └── utils
</pre>
