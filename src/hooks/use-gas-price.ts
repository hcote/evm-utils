import { useQuery } from '@tanstack/react-query';

export const useGasPrice = () => {
  return useQuery({
    queryKey: ['eth-gas-price'],
    queryFn: async () => {
      const res = await fetch('/api/gas-price');
      const data = await res.json();
      return data.gasPrice as string;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
};
