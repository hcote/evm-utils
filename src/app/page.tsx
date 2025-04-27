"use client";

import { NAVIGATION } from "@/constants/navigation";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="relative">
      {/* Content */}
      <div className="relative p-16 text-[var(--color-text-primary)]">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold leading-tight mb-4">
            Essential EVM Utilities
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] mb-6">
            Simple, powerful tools for Ethereum developers.
          </p>
        </div>

        {/* Tools Grid */}
        <div
          id="tools"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {NAVIGATION.map((nav) => (
            <div
              key={nav.path}
              onClick={() => handleNavigate(nav.path)}
              className="group transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg bg-[var(--color-surface)] border border-white/10 rounded-2xl p-6 cursor-pointer flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[var(--color-bg)] transition">
                  <nav.Icon size={28} />
                </div>
                <h2 className="text-xl font-semibold">{nav.name}</h2>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {nav.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
