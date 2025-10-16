"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

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
      className="flex items-center gap-2 cursor-pointer rounded-md px-1"
    >
      <Image src="/midjourney-eth.png" alt="Logo" width={48} height={48} />
      <span className="text-xl font-semibold">EVM Utils</span>
    </div>
  );
}
