"use client";

import { usePathname, useRouter } from "next/navigation";
import { NAVIGATION } from "@/constants/navigation";
import DropdownMenu from "@/ui/DropdownMenu";

export default function Dropdown() {
  const pathname = usePathname();
  const router = useRouter();

  const currentItem = NAVIGATION.find((item) => item.path === pathname) ?? {
    name: "Tools",
    Icon: () => null,
  };

  return (
    <DropdownMenu
      selected={currentItem}
      options={NAVIGATION}
      onSelect={(item) => (item.path ? router.push(item.path) : null)}
    />
  );
}
