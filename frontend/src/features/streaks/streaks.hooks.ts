"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { streaksService } from "./streaks.service";

export function useTodayStreak() {
  return useQuery({
    queryKey: ["streaks", "today"],
    queryFn: () => streaksService.getToday(),
  });
}

export function useStreakHistory() {
  return useQuery({
    queryKey: ["streaks", "history"],
    queryFn: () => streaksService.getHistory(),
  });
}

export function useMarkStudyDay() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (studyMinutes: number) =>
      streaksService.markStudyDay(studyMinutes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["streaks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
}
