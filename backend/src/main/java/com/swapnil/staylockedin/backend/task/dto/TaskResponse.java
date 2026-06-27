package com.swapnil.staylockedin.backend.task.dto;

import com.swapnil.staylockedin.backend.task.enums.TaskPriority;
import com.swapnil.staylockedin.backend.task.enums.TaskStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class TaskResponse {

    private Long id;

    private String title;

    private String description;

    private TaskStatus status;

    private TaskPriority priority;

    private LocalDate dueDate;

    private Integer estimatedMinutes;

    private LocalDateTime completedAt;

    private Long milestoneId;
}