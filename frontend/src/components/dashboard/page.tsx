import ProtectedRoute from "@/features/auth/protected-route";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-background p-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="mt-3 text-muted-foreground">
            Welcome to StayLockedIn
          </p>
        </div>
      </main>
    </ProtectedRoute>
  );
}