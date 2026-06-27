package com.swapnil.staylockedin.backend.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsResponse {

    // Goal Analytics
    private long totalGoals;
    private long completedGoals;
    private double goalCompletionRate;

    // Milestone Analytics
    private long totalMilestones;
    private long completedMilestones;
    private double milestoneCompletionRate;

    // Task Analytics
    private long totalTasks;
    private long completedTasks;
    private double taskCompletionRate;

    // Habit Analytics
    private long totalHabits;
    private long completedHabits;
    private double habitCompletionRate;

    // Streak Analytics
    private int currentStreak;
    private int longestStreak;
}