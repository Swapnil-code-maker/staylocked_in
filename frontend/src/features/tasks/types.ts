export type TaskStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export const TASK_PRIORITIES: TaskPriority[] = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "URGENT",
];

export const TASK_STATUSES: TaskStatus[] = [
  "NOT_STARTED",
  "IN_PROGRESS",
  "COMPLETED",
];

export interface TaskCreateRequest {
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: string;
  estimatedMinutes?: number;
  milestoneId: number;
}

export interface TaskUpdateRequest {
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: string;
  estimatedMinutes?: number;
}

export interface TaskStatusUpdateRequest {
  status: TaskStatus;
}

export interface TaskResponse {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  estimatedMinutes: number | null;
  completedAt: string | null;
  milestoneId: number;
}
