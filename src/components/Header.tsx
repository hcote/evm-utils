"use client";

import { useRouter } from "next/navigation";
import IcoEthereumRainbow from "@/icons/IcoEthereumRainbow";

export default function Header() {
  const router = useRouter();

  const handleRouteHome = () => {
    router.push("/");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleRouteHome();
    }
  };

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={handleRouteHome}
      onKeyDown={handleKeyDown}
      className="flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] rounded-md px-1"
    >
      <IcoEthereumRainbow size={32} />
      <span className="text-xl font-semibold">EVM Utils</span>
    </div>
  );
}
