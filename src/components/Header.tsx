"use client";

import { useRouter } from "next/navigation";
import IcoEthereumRainbow from "@/icons/IcoEthereumRainbow";

export default function Header() {
  const router = useRouter();

  const handleRouteHome = () => {
    router.push("/");
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer p-3 rounded hover:bg-gray-800 transition-colors"
      onClick={handleRouteHome}
    >
      <IcoEthereumRainbow size={32} />
      <span className="text-xl font-semibold">EVM Utils</span>
    </div>
  );
}
