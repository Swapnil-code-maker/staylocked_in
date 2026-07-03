export type GoalStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "PAUSED"
  | "CANCELLED";

export type GoalPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type GoalCategory =
  | "EXAM_PREPARATION"
  | "SKILL_DEVELOPMENT"
  | "CAREER"
  | "FITNESS"
  | "HEALTH"
  | "PERSONAL_GROWTH"
  | "FINANCIAL";

export const GOAL_PRIORITIES: GoalPriority[] = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
];

export const GOAL_CATEGORIES: GoalCategory[] = [
  "EXAM_PREPARATION",
  "SKILL_DEVELOPMENT",
  "CAREER",
  "FITNESS",
  "HEALTH",
  "PERSONAL_GROWTH",
  "FINANCIAL",
];

export interface GoalCreateRequest {
  title: string;
  description?: string;
  targetDate: string;
  priority: GoalPriority;
  category: GoalCategory;
}

export interface GoalUpdateRequest {
  title: string;
  description?: string;
  targetDate: string;
  priority: GoalPriority;
  category: GoalCategory;
}

export interface GoalResponse {
  id: number;
  title: string;
  description: string | null;
  targetDate: string;
  status: GoalStatus;
  priority: GoalPriority;
  category: GoalCategory;
  completionPercentage: number;
  userId: number;
}
