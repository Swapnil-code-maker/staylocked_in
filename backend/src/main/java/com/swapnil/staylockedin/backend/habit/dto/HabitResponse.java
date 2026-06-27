package com.swapnil.staylockedin.backend.habit.dto;

import com.swapnil.staylockedin.backend.habit.enums.HabitFrequency;
import com.swapnil.staylockedin.backend.habit.enums.HabitStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class HabitResponse {

    private Long id;

    private String title;

    private String description;

    private HabitFrequency frequency;

    private HabitStatus status;

    private Integer currentStreak;

    private Integer longestStreak;

    private LocalDate lastCompletedDate;

    private Long userId;
}