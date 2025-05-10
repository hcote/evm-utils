"use client";

import { Navigation } from "@/constants/navigation";
import { useRouter } from "next/navigation";
import { JSX, KeyboardEvent } from "react";

interface NavigationCardProps {
  nav: Omit<Navigation, "Icon"> & { Icon: JSX.Element };
}

export default function NavigationCard({ nav }: NavigationCardProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNavigate(nav.path);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => handleNavigate(nav.path)}
      onKeyDown={handleKeyDown}
      className="group transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:bg-[var(--color-btn-hover)] bg-[var(--color-surface)] border border-white/10 rounded-2xl p-6 cursor-pointer flex flex-col gap-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
    >
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-full bg-[var(--color-bg)] transition">
          {nav.Icon}
        </div>
        <h2 className="text-xl font-semibold">{nav.name}</h2>
      </div>
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
        {nav.shortDesc}
      </p>
    </div>
  );
}
