package com.swapnil.staylockedin.backend.goal.mapper;

import com.swapnil.staylockedin.backend.goal.dto.GoalResponse;
import com.swapnil.staylockedin.backend.goal.entity.Goal;

public class GoalMapper {

    private GoalMapper() {
    }

    public static GoalResponse toResponse(Goal goal) {

        return GoalResponse.builder()
                .id(goal.getId())
                .title(goal.getTitle())
                .description(goal.getDescription())
                .targetDate(goal.getTargetDate())
                .status(goal.getStatus())
                .priority(goal.getPriority())
                .category(goal.getCategory())
                .completionPercentage(goal.getCompletionPercentage())
                .userId(goal.getUser().getId())
                .build();
    }
}