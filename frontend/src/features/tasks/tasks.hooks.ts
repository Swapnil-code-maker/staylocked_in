"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { tasksService } from "./tasks.service";
import {
  TaskCreateRequest,
  TaskStatus,
  TaskUpdateRequest,
} from "./types";

const TASKS_KEY = ["tasks"] as const;

function invalidateRelated(queryClient: ReturnType<typeof useQueryClient>) {
  queryClient.invalidateQueries({ queryKey: TASKS_KEY });
  queryClient.invalidateQueries({ queryKey: ["milestones"] });
  queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  queryClient.invalidateQueries({ queryKey: ["analytics"] });
  queryClient.invalidateQueries({ queryKey: ["streaks"] });
}

export function useTasks() {
  return useQuery({
    queryKey: TASKS_KEY,
    queryFn: () => tasksService.getAll(),
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: TaskCreateRequest) => tasksService.create(request),
    onSuccess: () => invalidateRelated(queryClient),
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: TaskUpdateRequest }) =>
      tasksService.update(id, request),
    onSuccess: () => invalidateRelated(queryClient),
  });
}

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: TaskStatus }) =>
      tasksService.updateStatus(id, { status }),
    onSuccess: () => invalidateRelated(queryClient),
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => tasksService.remove(id),
    onSuccess: () => invalidateRelated(queryClient),
  });
}
