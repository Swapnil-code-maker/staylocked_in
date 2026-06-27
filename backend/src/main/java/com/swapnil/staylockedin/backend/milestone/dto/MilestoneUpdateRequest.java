package com.swapnil.staylockedin.backend.milestone.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class MilestoneUpdateRequest {

    @NotBlank
    private String title;

    private String description;

    @NotNull
    private LocalDate targetDate;

    @NotNull
    private Integer weight;
}