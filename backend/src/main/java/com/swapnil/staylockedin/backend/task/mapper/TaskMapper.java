package com.swapnil.staylockedin.backend.task.mapper;

import com.swapnil.staylockedin.backend.task.dto.TaskResponse;
import com.swapnil.staylockedin.backend.task.entity.Task;

public class TaskMapper {

    private TaskMapper() {
    }

    public static TaskResponse toResponse(Task task) {

        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .priority(task.getPriority())
                .dueDate(task.getDueDate())
                .estimatedMinutes(task.getEstimatedMinutes())
                .completedAt(task.getCompletedAt())
                .milestoneId(task.getMilestone().getId())
                .build();
    }
}