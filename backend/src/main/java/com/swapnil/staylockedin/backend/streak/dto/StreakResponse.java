package com.swapnil.staylockedin.backend.streak.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class StreakResponse {

    private Long id;

    private LocalDate activityDate;

    private Integer studyMinutes;

    private Integer tasksCompleted;

    private Integer habitsCompleted;

    private Integer goalsCompleted;

    private Boolean studyDay;

    private Integer currentStreak;

    private Integer longestStreak;

    private Long userId;
}