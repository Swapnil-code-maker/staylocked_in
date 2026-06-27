package com.swapnil.staylockedin.backend.habit.dto;

import com.swapnil.staylockedin.backend.habit.enums.HabitFrequency;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class HabitCreateRequest {

    @NotBlank
    private String title;

    private String description;

    @NotNull
    private HabitFrequency frequency;
}