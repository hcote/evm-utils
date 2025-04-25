"use client";

import { navigationSystem } from "@/constants/navigation-system";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div
      className="py-12 px-6"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text-primary)",
      }}
    >
      <h1 className="text-3xl font-bold mb-10 text-center">Get Started</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {navigationSystem.map((nav) => (
          <div
            key={nav.path}
            onClick={() => handleNavigate(nav.path)}
            className="transition-all duration-200 transform hover:scale-[1.02] hover:brightness-110 rounded-2xl p-6 cursor-pointer flex items-start gap-4"
            style={{
              backgroundColor: "var(--color-surface)",
            }}
          >
            <div>
              <div className="flex gap-3 items-center">
                <nav.Icon size={24} />
                <h2 className="text-xl font-semibold">{nav.name}</h2>
              </div>
              <p
                className="text-sm mt-2"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {nav.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
