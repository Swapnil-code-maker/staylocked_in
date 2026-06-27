package com.swapnil.staylockedin.backend.milestone.dto;

import com.swapnil.staylockedin.backend.milestone.enums.MilestoneStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class MilestoneResponse {

    private Long id;

    private String title;

    private String description;

    private LocalDate targetDate;

    private Integer weight;

    private Integer completionPercentage;

    private MilestoneStatus status;

    private Long goalId;
}
