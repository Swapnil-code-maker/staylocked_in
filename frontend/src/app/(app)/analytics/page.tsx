"use client";

import { Loader2 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useAnalytics } from "@/features/analytics/analytics.hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AnalyticsPage() {
  const { data, isLoading, isError } = useAnalytics();

  const chartData = data
    ? [
        { name: "Goals", rate: Math.round(data.goalCompletionRate) },
        { name: "Milestones", rate: Math.round(data.milestoneCompletionRate) },
        { name: "Tasks", rate: Math.round(data.taskCompletionRate) },
        { name: "Habits", rate: Math.round(data.habitCompletionRate) },
      ]
    : [];

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <h1 className="text-4xl font-bold">Analytics</h1>

        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading analytics...
          </div>
        )}

        {isError && (
          <p className="text-sm text-destructive">
            Couldn&apos;t load analytics.
          </p>
        )}

        {data && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardDescription>Goals</CardDescription>
                  <CardTitle className="text-2xl">
                    {data.completedGoals}/{data.totalGoals}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {data.goalCompletionRate.toFixed(1)}% completion rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardDescription>Milestones</CardDescription>
                  <CardTitle className="text-2xl">
                    {data.completedMilestones}/{data.totalMilestones}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {data.milestoneCompletionRate.toFixed(1)}% completion rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardDescription>Tasks</CardDescription>
                  <CardTitle className="text-2xl">
                    {data.completedTasks}/{data.totalTasks}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {data.taskCompletionRate.toFixed(1)}% completion rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardDescription>Habits</CardDescription>
                  <CardTitle className="text-2xl">
                    {data.completedHabits}/{data.totalHabits}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {data.habitCompletionRate.toFixed(1)}% completion rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardDescription>Current Streak</CardDescription>
                  <CardTitle className="text-2xl">
                    {data.currentStreak} days
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardDescription>Longest Streak</CardDescription>
                  <CardTitle className="text-2xl">
                    {data.longestStreak} days
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Completion Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar
                        dataKey="rate"
                        fill="var(--primary)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </main>
  );
}
