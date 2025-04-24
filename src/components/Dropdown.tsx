"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { navigationSystem } from "@/constants/navigation-system";

export default function Dropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="cursor-pointer px-4 py-2 text-sm rounded-md transition"
        style={{
          backgroundColor: "var(--color-surface)",
          color: "var(--color-text-primary)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#2f2f2f")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--color-surface)")
        }
      >
        Tools ▾
      </button>

      {dropdownOpen && (
        <div
          className="absolute top-full mt-2 right-0 w-72 rounded-md shadow-lg z-20"
          style={{
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text-primary)",
          }}
        >
          <ul className="max-h-96 overflow-y-auto">
            {navigationSystem.map(({ name, path }) => (
              <li
                key={name}
                className="px-4 py-3 transition cursor-pointer text-sm hover:bg-[rgba(255,255,255,0.05)] rounded-md"
                onClick={() => {
                  setDropdownOpen(false);
                  router.push(path);
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
