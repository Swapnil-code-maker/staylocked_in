"use client";

import ProtectedRoute from "@/features/auth/protected-route";
import NavBar from "@/components/layout/nav-bar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <NavBar />
        {children}
      </div>
    </ProtectedRoute>
  );
}
