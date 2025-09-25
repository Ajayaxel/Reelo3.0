"use client";

import { QueryProvider } from "@/components/query-provider";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
  children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <QueryProvider>
        {children}
      </QueryProvider>
    </SessionProvider>
  );
};
