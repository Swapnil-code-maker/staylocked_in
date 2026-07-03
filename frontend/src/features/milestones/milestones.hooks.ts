"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { milestonesService } from "./milestones.service";
import { MilestoneCreateRequest, MilestoneUpdateRequest } from "./types";

const MILESTONES_KEY = ["milestones"] as const;

export function useMilestones() {
  return useQuery({
    queryKey: MILESTONES_KEY,
    queryFn: () => milestonesService.getAll(),
  });
}

export function useCreateMilestone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: MilestoneCreateRequest) =>
      milestonesService.create(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MILESTONES_KEY });
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
}

export function useUpdateMilestone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: number;
      request: MilestoneUpdateRequest;
    }) => milestonesService.update(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MILESTONES_KEY });
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
}

export function useDeleteMilestone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => milestonesService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MILESTONES_KEY });
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
}
