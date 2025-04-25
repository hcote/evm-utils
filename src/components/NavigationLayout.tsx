"use client";

import TopNav from "./TopNav";
import SideNav from "./SideNav";
import { usePathname } from "next/navigation";

interface NavigationLayoutProps {
  children: React.ReactNode;
}

export default function NavigationLayout({ children }: NavigationLayoutProps) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/";

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && <SideNav />}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
