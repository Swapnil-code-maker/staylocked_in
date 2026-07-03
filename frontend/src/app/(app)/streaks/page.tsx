"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  useMarkStudyDay,
  useStreakHistory,
  useTodayStreak,
} from "@/features/streaks/streaks.hooks";
import { getApiErrorMessage } from "@/lib/api-error";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StreaksPage() {
  const { data: today, isLoading: loadingToday } = useTodayStreak();
  const { data: history, isLoading: loadingHistory } = useStreakHistory();
  const markStudyDay = useMarkStudyDay();

  const [minutes, setMinutes] = useState("30");

  async function handleMarkStudyDay(e: React.FormEvent) {
    e.preventDefault();

    try {
      await markStudyDay.mutateAsync(Number(minutes));
      toast.success("Study day logged.");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <h1 className="text-4xl font-bold">Streaks</h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Today</CardTitle>
              <CardDescription>Your activity for today</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingToday && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </div>
              )}

              {today && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Study Minutes</p>
                    <p className="text-2xl font-semibold">
                      {today.studyMinutes}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Current Streak</p>
                    <p className="text-2xl font-semibold">
                      {today.currentStreak}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Longest Streak</p>
                    <p className="text-2xl font-semibold">
                      {today.longestStreak}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Study Day</p>
                    <p className="text-2xl font-semibold">
                      {today.studyDay ? "Yes" : "No"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tasks Completed</p>
                    <p className="text-2xl font-semibold">
                      {today.tasksCompleted}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Habits Completed</p>
                    <p className="text-2xl font-semibold">
                      {today.habitsCompleted}
                    </p>
                  </div>
                </div>
              )}

              <form
                onSubmit={handleMarkStudyDay}
                className="mt-6 flex items-end gap-3"
              >
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium">
                    Log study minutes
                  </label>
                  <Input
                    type="number"
                    min={1}
                    required
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={markStudyDay.isPending}>
                  {markStudyDay.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Log"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>History</CardTitle>
              <CardDescription>Your recent activity</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingHistory && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </div>
              )}

              {history?.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No history yet.
                </p>
              )}

              <div className="max-h-96 space-y-2 overflow-y-auto">
                {history?.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm"
                  >
                    <span>{entry.activityDate}</span>
                    <span className="text-muted-foreground">
                      {entry.studyMinutes} min &middot; {entry.tasksCompleted}{" "}
                      tasks &middot; {entry.habitsCompleted} habits
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
