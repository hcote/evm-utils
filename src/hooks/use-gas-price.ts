import { useQuery } from '@tanstack/react-query';

export const useGasPrice = () => {
  return useQuery({
    queryKey: ['eth-gas-price'],
    queryFn: async () => {
      const res = await fetch('/api/gas-price');
      const data = await res.json();
      return data.gasPrice as string;
    },
    staleTime: 30_000,
    refetchInterval: 30_000,
  });
};
