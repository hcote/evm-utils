"use client";

import { useState, useRef, useEffect } from "react";
import IcoChevronDown from "@/icons/IcoChevronDown";

interface Option {
  name: string;
  Icon?: React.FC<
    React.SVGProps<SVGSVGElement> & {
      color?: string;
      size?: number;
      className?: string;
    }
  >;
}

interface DropdownMenuProps {
  selected: Option;
  options: Option[];
  onSelect: (...args: any) => void;
  buttonClassName?: string;
  dropdownClassName?: string;
  dropdownItemClassName?: string;
}

export default function DropdownMenu({
  selected,
  options,
  onSelect,
  buttonClassName = "",
  dropdownClassName = "",
  dropdownItemClassName = "",
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${dropdownClassName}`} ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`cursor-pointer px-4 py-2 text-sm rounded-md transition border border-white/10 hover:bg-[var(--color-btn-hover)] flex justify-center items-center gap-2 ${buttonClassName}`}
        style={{
          backgroundColor: "var(--color-surface)",
          color: "var(--color-text-primary)",
        }}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {selected.Icon && <selected.Icon size={16} className="shrink-0" />}
        {selected.name}
        <span
          className={`ml-1 transform transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <IcoChevronDown size={16} />
        </span>
      </button>

      {open && (
        <div
          className="absolute top-full mt-2 right-0 w-72 rounded-md shadow-xl z-50 border border-white/10"
          style={{
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text-primary)",
          }}
        >
          <ul role="menu" className="max-h-100 overflow-y-auto space-y-1 py-1">
            {options.map((option, i) => {
              const isSelected = option.name === selected.name;
              return (
                <li key={i} role="none">
                  <button
                    role="menuitem"
                    onClick={() => {
                      onSelect(option);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm transition rounded-md flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] ${
                      dropdownItemClassName ?? ""
                    } ${
                      isSelected
                        ? "bg-[rgba(255,255,255,0.1)] font-medium"
                        : "hover:bg-[rgba(255,255,255,0.1)]"
                    }`}
                  >
                    {option.Icon && (
                      <option.Icon size={16} className="shrink-0" />
                    )}
                    {option.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
