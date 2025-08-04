"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./react-query-client";

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // This function is a placeholder for the React Query provider setup
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
