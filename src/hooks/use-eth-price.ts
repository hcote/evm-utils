import { useQuery } from "@tanstack/react-query";

export const useEthPrice = () => {
  return useQuery({
    queryKey: ['eth-usd-price'],
    queryFn: async () => {
      const res = await fetch('/api/eth-price');
      const data = await res.json();
      return data.price as string;
    },
    staleTime: 1000 * 60 * 60, // 60 minutes
    gcTime: 1000 * 60 * 60, // 60 minutes
    });
};
  