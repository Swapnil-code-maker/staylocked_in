"use client";

import ThemeProvider from "./theme-provider";
import ReactQueryProvider from "./react-query-provider";
import SonnerProvider from "./sonner-provider";

import AuthProvider from "@/features/auth/auth-provider";

type Props = {
  children: React.ReactNode;
};

export default function AppProvider({
  children,
}: Props) {
  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <AuthProvider>
          {children}
          <SonnerProvider />
        </AuthProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}