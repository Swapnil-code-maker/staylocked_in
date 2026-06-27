package com.swapnil.staylockedin.backend.milestone.mapper;

import com.swapnil.staylockedin.backend.milestone.dto.MilestoneResponse;
import com.swapnil.staylockedin.backend.milestone.entity.Milestone;

public class MilestoneMapper {

    private MilestoneMapper() {
    }

    public static MilestoneResponse toResponse(Milestone milestone) {

        return MilestoneResponse.builder()
                .id(milestone.getId())
                .title(milestone.getTitle())
                .description(milestone.getDescription())
                .targetDate(milestone.getTargetDate())
                .weight(milestone.getWeight())
                .completionPercentage(milestone.getCompletionPercentage())
                .status(milestone.getStatus())
                .goalId(milestone.getGoal().getId())
                .build();
    }
}