package com.swapnil.staylockedin.backend.analytics.service;

import com.swapnil.staylockedin.backend.analytics.dto.AnalyticsResponse;
import com.swapnil.staylockedin.backend.goal.enums.GoalStatus;
import com.swapnil.staylockedin.backend.goal.repository.GoalRepository;
import com.swapnil.staylockedin.backend.habit.enums.HabitStatus;
import com.swapnil.staylockedin.backend.habit.repository.HabitRepository;
import com.swapnil.staylockedin.backend.milestone.enums.MilestoneStatus;
import com.swapnil.staylockedin.backend.milestone.repository.MilestoneRepository;
import com.swapnil.staylockedin.backend.streak.entity.Streak;
import com.swapnil.staylockedin.backend.streak.repository.StreakRepository;
import com.swapnil.staylockedin.backend.task.enums.TaskStatus;
import com.swapnil.staylockedin.backend.task.repository.TaskRepository;
import com.swapnil.staylockedin.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final GoalRepository goalRepository;
    private final MilestoneRepository milestoneRepository;
    private final TaskRepository taskRepository;
    private final HabitRepository habitRepository;
    private final StreakRepository streakRepository;

    public AnalyticsResponse getAnalytics(User user) {

        long totalGoals = goalRepository.countByUser(user);
        long completedGoals = goalRepository.countByUserAndStatus(user, GoalStatus.COMPLETED);

        long totalMilestones = milestoneRepository.countByGoalUser(user);
        long completedMilestones =
                milestoneRepository.countByGoalUserAndStatus(user, MilestoneStatus.COMPLETED);

        long totalTasks = taskRepository.countByUserId(user.getId());
        long completedTasks =
                taskRepository.countByUserIdAndStatus(user.getId(), TaskStatus.COMPLETED);

        long totalHabits = habitRepository.countByUser(user);
        long completedHabits =
                habitRepository.countByUserAndStatus(user, HabitStatus.COMPLETED);

        Streak latestStreak = streakRepository
                .findFirstByUserOrderByActivityDateDesc(user)
                .orElse(null);

        int currentStreak = latestStreak != null && latestStreak.getCurrentStreak() != null
                ? latestStreak.getCurrentStreak()
                : 0;

        int longestStreak = latestStreak != null && latestStreak.getLongestStreak() != null
                ? latestStreak.getLongestStreak()
                : 0;

        return AnalyticsResponse.builder()
                .totalGoals(totalGoals)
                .completedGoals(completedGoals)
                .goalCompletionRate(calculatePercentage(completedGoals, totalGoals))

                .totalMilestones(totalMilestones)
                .completedMilestones(completedMilestones)
                .milestoneCompletionRate(calculatePercentage(completedMilestones, totalMilestones))

                .totalTasks(totalTasks)
                .completedTasks(completedTasks)
                .taskCompletionRate(calculatePercentage(completedTasks, totalTasks))

                .totalHabits(totalHabits)
                .completedHabits(completedHabits)
                .habitCompletionRate(calculatePercentage(completedHabits, totalHabits))

                .currentStreak(currentStreak)
                .longestStreak(longestStreak)
                .build();
    }

    private double calculatePercentage(long completed, long total) {
        if (total == 0) {
            return 0.0;
        }
        return (completed * 100.0) / total;
    }
}