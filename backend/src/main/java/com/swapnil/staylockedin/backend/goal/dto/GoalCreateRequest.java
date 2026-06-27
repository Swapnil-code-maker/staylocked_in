package com.swapnil.staylockedin.backend.goal.dto;

import com.swapnil.staylockedin.backend.goal.enums.GoalCategory;
import com.swapnil.staylockedin.backend.goal.enums.GoalPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class GoalCreateRequest {

    @NotBlank
    private String title;

    private String description;

    @NotNull
    private LocalDate targetDate;

    @NotNull
    private GoalPriority priority;

    @NotNull
    private GoalCategory category;
}