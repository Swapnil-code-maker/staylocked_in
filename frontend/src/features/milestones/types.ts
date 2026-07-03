export type MilestoneStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export interface MilestoneCreateRequest {
  title: string;
  description?: string;
  targetDate: string;
  weight: number;
  goalId: number;
}

export interface MilestoneUpdateRequest {
  title: string;
  description?: string;
  targetDate: string;
  weight: number;
}

export interface MilestoneResponse {
  id: number;
  title: string;
  description: string | null;
  targetDate: string;
  weight: number;
  completionPercentage: number;
  status: MilestoneStatus;
  goalId: number;
}
