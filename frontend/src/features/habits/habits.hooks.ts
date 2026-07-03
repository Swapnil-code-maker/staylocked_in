"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { habitsService } from "./habits.service";
import { HabitCreateRequest, HabitUpdateRequest } from "./types";

const HABITS_KEY = ["habits"] as const;

function invalidateRelated(queryClient: ReturnType<typeof useQueryClient>) {
  queryClient.invalidateQueries({ queryKey: HABITS_KEY });
  queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  queryClient.invalidateQueries({ queryKey: ["analytics"] });
  queryClient.invalidateQueries({ queryKey: ["streaks"] });
}

export function useHabits() {
  return useQuery({
    queryKey: HABITS_KEY,
    queryFn: () => habitsService.getAll(),
  });
}

export function useCreateHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: HabitCreateRequest) => habitsService.create(request),
    onSuccess: () => invalidateRelated(queryClient),
  });
}

export function useUpdateHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: HabitUpdateRequest }) =>
      habitsService.update(id, request),
    onSuccess: () => invalidateRelated(queryClient),
  });
}

export function useCompleteHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => habitsService.complete(id),
    onSuccess: () => invalidateRelated(queryClient),
  });
}

export function useDeleteHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => habitsService.remove(id),
    onSuccess: () => invalidateRelated(queryClient),
  });
}
