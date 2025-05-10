export const chainlinkPriceFeedAbi = [
  {
    name: 'latestRoundData',
    type: 'function',
    stateMutability: 'view',
    outputs: [
      { name: 'roundId', type: 'uint80' },
      { name: 'answer', type: 'int256' },
      { name: 'startedAt', type: 'uint256' },
      { name: 'updatedAt', type: 'uint256' },
      { name: 'answeredInRound', type: 'uint80' },
    ],
    inputs: [],
  },
];