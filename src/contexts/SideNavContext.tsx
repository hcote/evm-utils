"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const SidebarContext = createContext<{
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);
