"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NAVIGATION } from "@/constants/navigation";
import IcoChevronDown from "@/icons/IcoChevronDown";

export default function Dropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const currentItem = NAVIGATION.find((item) => item.path === pathname);
  const selectedName = currentItem ? currentItem.name : "Tools";
  const SelectedIcon = currentItem?.Icon;

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
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="cursor-pointer px-4 py-2 text-sm rounded-md transition border border-white/10 hover:bg-[rgba(255,255,255,0.05)] flex items-center gap-2"
        style={{
          backgroundColor: "var(--color-surface)",
          color: "var(--color-text-primary)",
        }}
      >
        {SelectedIcon && <SelectedIcon size={16} />}
        {selectedName}
        <span
          className={`ml-1 transform transition-transform duration-200 ${
            dropdownOpen ? "rotate-180" : ""
          }`}
        >
          <IcoChevronDown size={16} />
        </span>
      </button>

      {dropdownOpen && (
        <div
          className="absolute top-full mt-2 right-0 w-72 rounded-md shadow-xl z-20 border border-white/10"
          style={{
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text-primary)",
          }}
        >
          <ul className="max-h-96 overflow-y-auto">
            {NAVIGATION.map(({ name, path, Icon }) => {
              const isSelected = path === pathname;
              return (
                <li
                  key={name}
                  onClick={() => {
                    setDropdownOpen(false);
                    router.push(path);
                  }}
                  className={`px-4 py-3 text-sm cursor-pointer transition rounded-md flex items-center gap-2 ${
                    isSelected
                      ? "bg-[rgba(255,255,255,0.1)] font-medium"
                      : "hover:bg-[rgba(255,255,255,0.1)]"
                  }`}
                >
                  <Icon size={16} />
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
