import { useQuery } from "@tanstack/react-query";

export const useEthPrice = () => {
  return useQuery({
    queryKey: ['eth-usd-price'],
    queryFn: async () => {
      const res = await fetch('/api/eth-price');
      const data = await res.json();
      return data.price as string;
    },
    staleTime: 60_000,
    refetchInterval: 60_000,
  });
};
  