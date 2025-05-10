"use client";

import { NAVIGATION } from "@/constants/navigation";
import { useSidebar } from "@/contexts/SideNavContext";
import IcoClose from "@/icons/IcoClose";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";

export default function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar();
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
        }`}
        onClick={(e) => {
          if (
            sidebarRef.current &&
            !sidebarRef.current.contains(e.target as Node)
          ) {
            setIsOpen(false);
          }
        }}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`absolute top-0 right-0 h-screen bg-[var(--color-surface)] border-l border-white/10 shadow-lg p-4 space-y-6 transform transition-transform duration-200 ease-in-out pointer-events-auto
    ${isOpen ? "translate-x-0" : "translate-x-full"} rounded-tl-xl rounded-bl-xl
  `}
        style={{ width: "fit-content", maxWidth: "100vw" }}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="cursor-pointer absolute top-5 right-5 p-2 text-[var(--color-text-secondary)] rounded-4xl transition-colors hover:bg-[var(--color-btn-hover)]"
          aria-label="Close sidebar"
        >
          <IcoClose size={24} />
        </button>

        <div className="mt-12 space-y-0.5 w-68">
          <ul role="menu" className="space-y-0.5">
            {NAVIGATION.map((item, i) => {
              const isSelected = item.path === pathname;
              return (
                <li key={i} role="none">
                  <button
                    role="menuitem"
                    onClick={() => {
                      router.push(item.path);
                      setIsOpen(false);
                    }}
                    className={`cursor-pointer w-full text-left px-4 py-3 text-sm transition rounded-md flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-[var(--color-text-primary)] ${
                      isSelected
                        ? "bg-[var(--color-btn-hover)] font-medium"
                        : "hover:bg-[var(--color-btn-hover)]"
                    }`}
                  >
                    {item.Icon && <item.Icon size={16} className="shrink-0" />}
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
