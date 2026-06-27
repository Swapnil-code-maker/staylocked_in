package com.swapnil.staylockedin.backend.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private long totalGoals;
    private long completedGoals;

    private long totalMilestones;
    private long completedMilestones;

    private long totalTasks;
    private long completedTasks;

    private int overallProgress;
}