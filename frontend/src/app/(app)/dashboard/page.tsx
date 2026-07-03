"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/features/auth/auth-context";
import { useDashboard } from "@/features/dashboard/dashboard.hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-3xl">{value}</CardTitle>
      </CardHeader>
      {sub && (
        <CardContent>
          <p className="text-sm text-muted-foreground">{sub}</p>
        </CardContent>
      )}
    </Card>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { data, isLoading, isError } = useDashboard();

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Welcome back{user ? `, ${user.fullName}` : ""}.
          </p>
        </div>

        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading your dashboard...
          </div>
        )}

        {isError && (
          <p className="text-sm text-destructive">
            Couldn&apos;t load dashboard data. Please refresh.
          </p>
        )}

        {data && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                label="Goals"
                value={`${data.completedGoals}/${data.totalGoals}`}
                sub="Completed / Total"
              />
              <StatCard
                label="Milestones"
                value={`${data.completedMilestones}/${data.totalMilestones}`}
                sub="Completed / Total"
              />
              <StatCard
                label="Tasks"
                value={`${data.completedTasks}/${data.totalTasks}`}
                sub="Completed / Total"
              />
              <StatCard
                label="Overall Progress"
                value={`${data.overallProgress}%`}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/goals"
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Manage Goals
              </Link>
              <Link
                href="/tasks"
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Manage Tasks
              </Link>
              <Link
                href="/habits"
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Manage Habits
              </Link>
              <Link
                href="/streaks"
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                View Streaks
              </Link>
              <Link
                href="/analytics"
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                View Analytics
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
