package com.swapnil.staylockedin.backend.progress.service;

import com.swapnil.staylockedin.backend.exception.ResourceNotFoundException;
import com.swapnil.staylockedin.backend.goal.entity.Goal;
import com.swapnil.staylockedin.backend.goal.enums.GoalStatus;
import com.swapnil.staylockedin.backend.milestone.entity.Milestone;
import com.swapnil.staylockedin.backend.milestone.enums.MilestoneStatus;
import com.swapnil.staylockedin.backend.milestone.repository.MilestoneRepository;
import com.swapnil.staylockedin.backend.task.entity.Task;
import com.swapnil.staylockedin.backend.task.enums.TaskStatus;
import com.swapnil.staylockedin.backend.task.repository.TaskRepository;
import com.swapnil.staylockedin.backend.goal.repository.GoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProgressService {

    private final MilestoneRepository milestoneRepository;
    private final TaskRepository taskRepository;
    private final GoalRepository goalRepository;

    public void recalculateMilestoneProgress(Long milestoneId) {

        Milestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Milestone",
                                milestoneId));

        List<Task> tasks = taskRepository.findByMilestone(milestone);

        if (tasks.isEmpty()) {
            milestone.setCompletionPercentage(0);
            milestone.setStatus(MilestoneStatus.NOT_STARTED);

            milestoneRepository.save(milestone);

            recalculateGoalProgress(milestone.getGoal().getId());
            return;
        }

        long completedTasks = tasks.stream()
                .filter(task -> task.getStatus() == TaskStatus.COMPLETED)
                .count();

        int progress = (int) ((completedTasks * 100) / tasks.size());

        milestone.setCompletionPercentage(progress);

        if (progress == 0) {
            milestone.setStatus(MilestoneStatus.NOT_STARTED);
        } else if (progress == 100) {
            milestone.setStatus(MilestoneStatus.COMPLETED);
        } else {
            milestone.setStatus(MilestoneStatus.IN_PROGRESS);
        }

        milestoneRepository.save(milestone);

        recalculateGoalProgress(milestone.getGoal().getId());
    }

    public void recalculateGoalProgress(Long goalId) {

        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Goal",
                                goalId));

        List<Milestone> milestones = milestoneRepository.findByGoal(goal);

        if (milestones.isEmpty()) {

            goal.setCompletionPercentage(0);

            if (goal.getStatus() != GoalStatus.PAUSED
                    && goal.getStatus() != GoalStatus.CANCELLED) {

                goal.setStatus(GoalStatus.NOT_STARTED);
            }

            goalRepository.save(goal);
            return;
        }

        int totalWeightedProgress = 0;
        int totalWeight = 0;

        for (Milestone milestone : milestones) {

            totalWeightedProgress +=
                    milestone.getCompletionPercentage() * milestone.getWeight();

            totalWeight += milestone.getWeight();
        }

        int goalProgress = totalWeight == 0
                ? 0
                : totalWeightedProgress / totalWeight;

        goal.setCompletionPercentage(goalProgress);

        if (goal.getStatus() != GoalStatus.PAUSED
                && goal.getStatus() != GoalStatus.CANCELLED) {

            if (goalProgress == 0) {
                goal.setStatus(GoalStatus.NOT_STARTED);
            } else if (goalProgress == 100) {
                goal.setStatus(GoalStatus.COMPLETED);
            } else {
                goal.setStatus(GoalStatus.IN_PROGRESS);
            }
        }

        goalRepository.save(goal);
    }
}