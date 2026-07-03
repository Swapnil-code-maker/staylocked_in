export interface StreakResponse {
  id: number;
  activityDate: string;
  studyMinutes: number;
  tasksCompleted: number;
  habitsCompleted: number;
  goalsCompleted: number;
  studyDay: boolean;
  currentStreak: number;
  longestStreak: number;
  userId: number;
}
