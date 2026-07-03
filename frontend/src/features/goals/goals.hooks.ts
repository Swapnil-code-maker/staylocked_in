"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { goalsService } from "./goals.service";
import { GoalCreateRequest, GoalUpdateRequest } from "./types";

const GOALS_KEY = ["goals"] as const;

export function useGoals() {
  return useQuery({
    queryKey: GOALS_KEY,
    queryFn: () => goalsService.getAll(),
  });
}

export function useCreateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: GoalCreateRequest) => goalsService.create(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GOALS_KEY });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
}

export function useUpdateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: GoalUpdateRequest }) =>
      goalsService.update(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GOALS_KEY });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
}

export function useDeleteGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => goalsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GOALS_KEY });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      queryClient.invalidateQueries({ queryKey: ["milestones"] });
    },
  });
}
