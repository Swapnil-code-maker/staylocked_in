package com.swapnil.staylockedin.backend.goal.service;

import com.swapnil.staylockedin.backend.exception.ResourceNotFoundException;
import com.swapnil.staylockedin.backend.goal.dto.GoalCreateRequest;
import com.swapnil.staylockedin.backend.goal.dto.GoalResponse;
import com.swapnil.staylockedin.backend.goal.dto.GoalUpdateRequest;
import com.swapnil.staylockedin.backend.goal.entity.Goal;
import com.swapnil.staylockedin.backend.goal.enums.GoalStatus;
import com.swapnil.staylockedin.backend.goal.mapper.GoalMapper;
import com.swapnil.staylockedin.backend.goal.repository.GoalRepository;
import com.swapnil.staylockedin.backend.milestone.entity.Milestone;
import com.swapnil.staylockedin.backend.milestone.repository.MilestoneRepository;
import com.swapnil.staylockedin.backend.task.entity.Task;
import com.swapnil.staylockedin.backend.task.repository.TaskRepository;
import com.swapnil.staylockedin.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalService {

    private final GoalRepository goalRepository;
    private final MilestoneRepository milestoneRepository;
    private final TaskRepository taskRepository;

    public GoalResponse createGoal(GoalCreateRequest request,
                                   User authenticatedUser) {

        Goal goal = Goal.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .targetDate(request.getTargetDate())
                .priority(request.getPriority())
                .category(request.getCategory())
                .status(GoalStatus.NOT_STARTED)
                .completionPercentage(0)
                .user(authenticatedUser)
                .build();

        Goal savedGoal = goalRepository.save(goal);

        return GoalMapper.toResponse(savedGoal);
    }

    public List<GoalResponse> getAllGoals(User authenticatedUser) {

        return goalRepository.findByUser(authenticatedUser)
                .stream()
                .map(GoalMapper::toResponse)
                .toList();
    }

    public GoalResponse getGoalById(Long id,
                                    User authenticatedUser) {

        Goal goal = goalRepository.findByIdAndUser(id, authenticatedUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Goal",
                                id));

        return GoalMapper.toResponse(goal);
    }

    public GoalResponse updateGoal(Long goalId,
                                   GoalUpdateRequest request,
                                   User authenticatedUser) {

        Goal goal = goalRepository.findByIdAndUser(goalId, authenticatedUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Goal",
                                goalId));

        goal.setTitle(request.getTitle());
        goal.setDescription(request.getDescription());
        goal.setTargetDate(request.getTargetDate());
        goal.setPriority(request.getPriority());
        goal.setCategory(request.getCategory());

        Goal updatedGoal = goalRepository.save(goal);

        return GoalMapper.toResponse(updatedGoal);
    }

    @Transactional
    public void deleteGoal(Long goalId,
                           User authenticatedUser) {

        Goal goal = goalRepository.findByIdAndUser(goalId, authenticatedUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Goal",
                                goalId));

        List<Milestone> milestones = milestoneRepository.findByGoal(goal);

        for (Milestone milestone : milestones) {

            List<Task> tasks = taskRepository.findByMilestone(milestone);

            taskRepository.deleteAll(tasks);
        }

        milestoneRepository.deleteAll(milestones);

        goalRepository.delete(goal);
    }
}