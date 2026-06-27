package com.swapnil.staylockedin.backend.task.service;

import com.swapnil.staylockedin.backend.exception.ResourceNotFoundException;
import com.swapnil.staylockedin.backend.milestone.entity.Milestone;
import com.swapnil.staylockedin.backend.milestone.repository.MilestoneRepository;
import com.swapnil.staylockedin.backend.progress.service.ProgressService;
import com.swapnil.staylockedin.backend.task.dto.TaskCreateRequest;
import com.swapnil.staylockedin.backend.task.dto.TaskResponse;
import com.swapnil.staylockedin.backend.task.dto.TaskUpdateRequest;
import com.swapnil.staylockedin.backend.task.entity.Task;
import com.swapnil.staylockedin.backend.task.enums.TaskStatus;
import com.swapnil.staylockedin.backend.task.mapper.TaskMapper;
import com.swapnil.staylockedin.backend.task.repository.TaskRepository;
import com.swapnil.staylockedin.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final MilestoneRepository milestoneRepository;
    private final ProgressService progressService;

    @Transactional
    public TaskResponse createTask(TaskCreateRequest request,
                                   User authenticatedUser) {

        Milestone milestone = milestoneRepository.findByIdAndGoalUser(
                        request.getMilestoneId(),
                        authenticatedUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Milestone",
                                request.getMilestoneId()));

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority())
                .dueDate(request.getDueDate())
                .estimatedMinutes(request.getEstimatedMinutes())
                .status(TaskStatus.NOT_STARTED)
                .milestone(milestone)
                .build();

        Task savedTask = taskRepository.save(task);

        progressService.recalculateMilestoneProgress(
                milestone.getId()
        );

        return TaskMapper.toResponse(savedTask);
    }

    public List<TaskResponse> getAllTasks(User authenticatedUser) {

        return taskRepository.findByMilestoneGoalUser(authenticatedUser)
                .stream()
                .map(TaskMapper::toResponse)
                .toList();
    }

    public TaskResponse getTaskById(Long taskId,
                                    User authenticatedUser) {

        Task task = taskRepository.findByIdAndMilestoneGoalUser(
                        taskId,
                        authenticatedUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Task",
                                taskId));

        return TaskMapper.toResponse(task);
    }

    @Transactional
    public TaskResponse updateTaskStatus(Long taskId,
                                         TaskStatus status,
                                         User authenticatedUser) {

        Task task = taskRepository.findByIdAndMilestoneGoalUser(
                        taskId,
                        authenticatedUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Task",
                                taskId));

        task.setStatus(status);

        if (status == TaskStatus.COMPLETED) {
            task.setCompletedAt(LocalDateTime.now());
        } else {
            task.setCompletedAt(null);
        }

        Task updatedTask = taskRepository.save(task);

        progressService.recalculateMilestoneProgress(
                task.getMilestone().getId()
        );

        return TaskMapper.toResponse(updatedTask);
    }

    @Transactional
    public TaskResponse updateTask(Long taskId,
                                   TaskUpdateRequest request,
                                   User authenticatedUser) {

        Task task = taskRepository.findByIdAndMilestoneGoalUser(
                        taskId,
                        authenticatedUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Task",
                                taskId));

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());
        task.setEstimatedMinutes(request.getEstimatedMinutes());

        Task updatedTask = taskRepository.save(task);

        return TaskMapper.toResponse(updatedTask);
    }

    @Transactional
    public void deleteTask(Long taskId,
                           User authenticatedUser) {

        Task task = taskRepository.findByIdAndMilestoneGoalUser(
                        taskId,
                        authenticatedUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Task",
                                taskId));

        Long milestoneId = task.getMilestone().getId();

        taskRepository.delete(task);

        progressService.recalculateMilestoneProgress(
                milestoneId
        );
    }
}