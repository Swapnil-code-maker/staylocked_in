package com.swapnil.staylockedin.backend.task.dto;

import com.swapnil.staylockedin.backend.task.enums.TaskPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskUpdateRequest {

    @NotBlank
    private String title;

    private String description;

    @NotNull
    private TaskPriority priority;

    private LocalDate dueDate;

    private Integer estimatedMinutes;
}