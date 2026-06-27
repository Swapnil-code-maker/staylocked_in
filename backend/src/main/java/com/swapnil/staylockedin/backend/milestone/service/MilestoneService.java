package com.swapnil.staylockedin.backend.milestone.service;

import com.swapnil.staylockedin.backend.exception.ResourceNotFoundException;
import com.swapnil.staylockedin.backend.goal.entity.Goal;
import com.swapnil.staylockedin.backend.goal.repository.GoalRepository;
import com.swapnil.staylockedin.backend.milestone.dto.MilestoneCreateRequest;
import com.swapnil.staylockedin.backend.milestone.dto.MilestoneResponse;
import com.swapnil.staylockedin.backend.milestone.dto.MilestoneUpdateRequest;
import com.swapnil.staylockedin.backend.milestone.entity.Milestone;
import com.swapnil.staylockedin.backend.milestone.enums.MilestoneStatus;
import com.swapnil.staylockedin.backend.milestone.mapper.MilestoneMapper;
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
public class MilestoneService {

    private final MilestoneRepository milestoneRepository;
    private final GoalRepository goalRepository;
    private final TaskRepository taskRepository;

    public MilestoneResponse createMilestone(MilestoneCreateRequest request,
                                             User authenticatedUser) {

        Goal goal = goalRepository.findByIdAndUser(
                        request.getGoalId(),
                        authenticatedUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Goal",
                                request.getGoalId()));

        Milestone milestone = Milestone.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .targetDate(request.getTargetDate())
                .weight(request.getWeight())
                .completionPercentage(0)
                .status(MilestoneStatus.NOT_STARTED)
                .goal(goal)
                .build();

        Milestone savedMilestone = milestoneRepository.save(milestone);

        return MilestoneMapper.toResponse(savedMilestone);
    }

    public List<MilestoneResponse> getAllMilestones(User authenticatedUser) {

        return milestoneRepository.findByGoalUser(authenticatedUser)
                .stream()
                .map(MilestoneMapper::toResponse)
                .toList();
    }

    public MilestoneResponse getMilestoneById(Long milestoneId,
                                              User authenticatedUser) {

        Milestone milestone = milestoneRepository.findByIdAndGoalUser(
                        milestoneId,
                        authenticatedUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Milestone",
                                milestoneId));

        return MilestoneMapper.toResponse(milestone);
    }

    public MilestoneResponse updateMilestone(Long milestoneId,
                                             MilestoneUpdateRequest request,
                                             User authenticatedUser) {

        Milestone milestone = milestoneRepository.findByIdAndGoalUser(
                        milestoneId,
                        authenticatedUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Milestone",
                                milestoneId));

        milestone.setTitle(request.getTitle());
        milestone.setDescription(request.getDescription());
        milestone.setTargetDate(request.getTargetDate());
        milestone.setWeight(request.getWeight());

        Milestone updatedMilestone = milestoneRepository.save(milestone);

        return MilestoneMapper.toResponse(updatedMilestone);
    }

    @Transactional
    public void deleteMilestone(Long milestoneId,
                                User authenticatedUser) {

        Milestone milestone = milestoneRepository.findByIdAndGoalUser(
                        milestoneId,
                        authenticatedUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Milestone",
                                milestoneId));

        List<Task> tasks = taskRepository.findByMilestone(milestone);

        taskRepository.deleteAll(tasks);

        milestoneRepository.delete(milestone);
    }
}