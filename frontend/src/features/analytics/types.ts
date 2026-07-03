export interface AnalyticsResponse {
  totalGoals: number;
  completedGoals: number;
  goalCompletionRate: number;

  totalMilestones: number;
  completedMilestones: number;
  milestoneCompletionRate: number;

  totalTasks: number;
  completedTasks: number;
  taskCompletionRate: number;

  totalHabits: number;
  completedHabits: number;
  habitCompletionRate: number;

  currentStreak: number;
  longestStreak: number;
}
