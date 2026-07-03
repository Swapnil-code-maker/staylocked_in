export type HabitFrequency = "DAILY" | "WEEKLY" | "MONTHLY";
export type HabitStatus = "ACTIVE" | "PAUSED" | "COMPLETED";

export const HABIT_FREQUENCIES: HabitFrequency[] = [
  "DAILY",
  "WEEKLY",
  "MONTHLY",
];

export const HABIT_STATUSES: HabitStatus[] = ["ACTIVE", "PAUSED", "COMPLETED"];

export interface HabitCreateRequest {
  title: string;
  description?: string;
  frequency: HabitFrequency;
}

export interface HabitUpdateRequest {
  title: string;
  description?: string;
  frequency: HabitFrequency;
  status: HabitStatus;
}

export interface HabitResponse {
  id: number;
  title: string;
  description: string | null;
  frequency: HabitFrequency;
  status: HabitStatus;
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null;
  userId: number;
}
