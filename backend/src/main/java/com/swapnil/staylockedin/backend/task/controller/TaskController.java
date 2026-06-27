package com.swapnil.staylockedin.backend.task.controller;

import com.swapnil.staylockedin.backend.security.user.CustomUserDetails;
import com.swapnil.staylockedin.backend.task.dto.TaskCreateRequest;
import com.swapnil.staylockedin.backend.task.dto.TaskResponse;
import com.swapnil.staylockedin.backend.task.dto.TaskStatusUpdateRequest;
import com.swapnil.staylockedin.backend.task.dto.TaskUpdateRequest;
import com.swapnil.staylockedin.backend.task.service.TaskService;
import com.swapnil.staylockedin.backend.user.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public TaskResponse createTask(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @Valid @RequestBody TaskCreateRequest request) {

        User authenticatedUser = customUserDetails.getUser();

        return taskService.createTask(request, authenticatedUser);
    }

    @GetMapping
    public List<TaskResponse> getAllTasks(
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        User authenticatedUser = customUserDetails.getUser();

        return taskService.getAllTasks(authenticatedUser);
    }

    @GetMapping("/{id}")
    public TaskResponse getTaskById(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable Long id) {

        User authenticatedUser = customUserDetails.getUser();

        return taskService.getTaskById(id, authenticatedUser);
    }

    @PutMapping("/{id}")
    public TaskResponse updateTask(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable Long id,
            @Valid @RequestBody TaskUpdateRequest request) {

        User authenticatedUser = customUserDetails.getUser();

        return taskService.updateTask(id, request, authenticatedUser);
    }

    @PatchMapping("/{id}/status")
    public TaskResponse updateTaskStatus(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable Long id,
            @Valid @RequestBody TaskStatusUpdateRequest request) {

        User authenticatedUser = customUserDetails.getUser();

        return taskService.updateTaskStatus(
                id,
                request.getStatus(),
                authenticatedUser
        );
    }

    @DeleteMapping("/{id}")
    public void deleteTask(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable Long id) {

        User authenticatedUser = customUserDetails.getUser();

        taskService.deleteTask(id, authenticatedUser);
    }
}