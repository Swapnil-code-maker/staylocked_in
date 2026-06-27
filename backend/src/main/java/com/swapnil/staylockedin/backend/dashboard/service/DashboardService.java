package com.swapnil.staylockedin.backend.dashboard.service;

import com.swapnil.staylockedin.backend.dashboard.dto.DashboardResponse;
import com.swapnil.staylockedin.backend.goal.enums.GoalStatus;
import com.swapnil.staylockedin.backend.goal.repository.GoalRepository;
import com.swapnil.staylockedin.backend.milestone.enums.MilestoneStatus;
import com.swapnil.staylockedin.backend.milestone.repository.MilestoneRepository;
import com.swapnil.staylockedin.backend.task.enums.TaskStatus;
import com.swapnil.staylockedin.backend.task.repository.TaskRepository;
import com.swapnil.staylockedin.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final GoalRepository goalRepository;
    private final MilestoneRepository milestoneRepository;
    private final TaskRepository taskRepository;

    public DashboardResponse getDashboardData(User authenticatedUser) {

        long totalGoals = goalRepository.countByUser(authenticatedUser);

        long completedGoals = goalRepository.countByUserAndStatus(
                authenticatedUser,
                GoalStatus.COMPLETED
        );

        long totalMilestones = milestoneRepository.countByGoalUser(
                authenticatedUser
        );

        long completedMilestones = milestoneRepository.countByGoalUserAndStatus(
                authenticatedUser,
                MilestoneStatus.COMPLETED
        );

        long totalTasks = taskRepository.countByUserId(
                authenticatedUser.getId()
        );

        long completedTasks = taskRepository.countByUserIdAndStatus(
                authenticatedUser.getId(),
                TaskStatus.COMPLETED
        );

        int overallProgress = 0;

        if (totalGoals > 0) {
            overallProgress = (int) (
                    (completedGoals * 100.0) / totalGoals
            );
        }

        return DashboardResponse.builder()
                .totalGoals(totalGoals)
                .completedGoals(completedGoals)
                .totalMilestones(totalMilestones)
                .completedMilestones(completedMilestones)
                .totalTasks(totalTasks)
                .completedTasks(completedTasks)
                .overallProgress(overallProgress)
                .build();
    }
}