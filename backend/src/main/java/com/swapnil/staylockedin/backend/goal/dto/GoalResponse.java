package com.swapnil.staylockedin.backend.goal.dto;

import com.swapnil.staylockedin.backend.goal.enums.GoalCategory;
import com.swapnil.staylockedin.backend.goal.enums.GoalPriority;
import com.swapnil.staylockedin.backend.goal.enums.GoalStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class GoalResponse {

    private Long id;

    private String title;

    private String description;

    private LocalDate targetDate;

    private GoalStatus status;

    private GoalPriority priority;

    private GoalCategory category;

    private Integer completionPercentage;

    private Long userId;
}