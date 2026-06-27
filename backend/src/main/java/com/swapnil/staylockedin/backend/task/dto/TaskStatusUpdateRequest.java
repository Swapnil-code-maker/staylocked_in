package com.swapnil.staylockedin.backend.task.dto;

import com.swapnil.staylockedin.backend.task.enums.TaskStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TaskStatusUpdateRequest {

    @NotNull
    private TaskStatus status;
}