package com.swapnil.staylockedin.backend.habit.mapper;

import com.swapnil.staylockedin.backend.habit.dto.HabitResponse;
import com.swapnil.staylockedin.backend.habit.entity.Habit;

public class HabitMapper {

    private HabitMapper() {
    }

    public static HabitResponse toResponse(Habit habit) {

        return HabitResponse.builder()
                .id(habit.getId())
                .title(habit.getTitle())
                .description(habit.getDescription())
                .frequency(habit.getFrequency())
                .status(habit.getStatus())
                .currentStreak(habit.getCurrentStreak())
                .longestStreak(habit.getLongestStreak())
                .lastCompletedDate(habit.getLastCompletedDate())
                .userId(habit.getUser().getId())
                .build();
    }
}