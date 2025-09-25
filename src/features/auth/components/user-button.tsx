"use client";

import { useSession, signOut } from "next-auth/react";
import { Crown, Loader, LogOut } from "lucide-react";

import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserButton = () => {
  const session = useSession();

  if (session.status === "loading") {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (session.status === "unauthenticated" || !session.data) {
    return null;
  }

  // ✅ safely handle name + image
  const name = session.data?.user?.name ?? "";
  const imageUrl = session.data?.user?.image;
  const fallbackLetter = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <div className="absolute -top-1 -left-1 z-10 flex items-center justify-center">
          <div className="rounded-full bg-white flex items-center justify-center p-1 drop-shadow-sm">
            <Crown className="size-3 text-yellow-500 fill-yellow-500" />
          </div>
        </div>
        <Avatar className="size-10 hover:opcaity-75 transition">
          <AvatarImage alt={name || "User"} src={imageUrl || ""} />
          <AvatarFallback className="bg-blue-500 font-medium text-white flex items-center justify-center">
            {fallbackLetter}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuSeparator />
        <DropdownMenuItem className="h-10" onClick={() => signOut()}>
          <LogOut className="size-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

