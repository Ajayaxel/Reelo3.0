"use client";

import { Home, MessageCircleQuestion } from "lucide-react";
import { usePathname } from "next/navigation";


import { SidebarItem } from "./sidebar-item";

export const SidebarRoutes = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-y-4 flex-1">
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem href="/main" icon={Home} label="Home" isActive={pathname === "/main"} />
      </ul>
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href="ajayps8590@gmail.com"
          icon={MessageCircleQuestion}
          label="Get Help"
        />
      </ul>
    </div>
  );
};
