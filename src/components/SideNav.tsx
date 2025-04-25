"use client";

import { navigationSystem } from "@/constants/navigation-system";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SideNav() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className="transition-all duration-300 border-r border-white/10 bg-[var(--color-surface)]"
      style={{
        width: isCollapsed ? "4rem" : "fit-content",
        minWidth: isCollapsed ? "4rem" : "fit-content",
        overflow: "hidden",
      }}
    >
      <div className="flex flex-col gap-2 p-2">
        {navigationSystem.map(({ name, path, Icon }) => (
          <div
            key={path}
            onClick={() => router.push(path)}
            className="group h-12 cursor-pointer flex items-center hover:bg-white/5 rounded-lg transition-colors"
          >
            <div className="flex items-center w-full">
              <div className="w-12 flex justify-center items-center shrink-0">
                <Icon size={24} />
              </div>

              <div
                className={`overflow-hidden whitespace-nowrap transition-all duration-300`}
                style={{
                  opacity: isCollapsed ? 0 : 1,
                  maxWidth: isCollapsed ? 0 : 300,
                }}
              >
                <span className="text-sm">{name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
