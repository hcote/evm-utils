"use client";

import { usePathname, useRouter } from "next/navigation";
import { NAVIGATION } from "@/constants/navigation";
import DropdownMenu from "@/ui/DropdownMenu";
import { useEffect, useState } from "react";
import { useSidebar } from "@/contexts/SideNavContext";
import IcoMenu from "@/icons/IcoMenu";

export default function Dropdown() {
  const pathname = usePathname();
  const router = useRouter();
  const { setIsOpen } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 500);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const currentItem = NAVIGATION.find((item) => item.path === pathname) ?? {
    name: "Tools",
    Icon: () => null,
  };

  if (isMobile) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation"
        className="cursor-pointer p-1.5 rounded-md transition-colors hover:bg-[var(--color-surface)]"
      >
        <IcoMenu size={26} />
      </button>
    );
  }

  return (
    <DropdownMenu
      selected={currentItem}
      options={NAVIGATION}
      onSelect={(item) => item.path && router.push(item.path)}
    />
  );
}
