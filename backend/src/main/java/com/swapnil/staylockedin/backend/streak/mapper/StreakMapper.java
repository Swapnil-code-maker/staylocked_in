package com.swapnil.staylockedin.backend.streak.mapper;

import com.swapnil.staylockedin.backend.streak.dto.StreakResponse;
import com.swapnil.staylockedin.backend.streak.entity.Streak;

public class StreakMapper {

    private StreakMapper() {
    }

    public static StreakResponse toResponse(Streak streak) {

        return StreakResponse.builder()
                .id(streak.getId())
                .activityDate(streak.getActivityDate())
                .studyMinutes(streak.getStudyMinutes())
                .tasksCompleted(streak.getTasksCompleted())
                .habitsCompleted(streak.getHabitsCompleted())
                .goalsCompleted(streak.getGoalsCompleted())
                .studyDay(streak.getStudyDay())
                .currentStreak(streak.getCurrentStreak())
                .longestStreak(streak.getLongestStreak())
                .userId(streak.getUser().getId())
                .build();
    }
}