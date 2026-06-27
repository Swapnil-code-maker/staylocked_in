package com.swapnil.staylockedin.backend.milestone.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.swapnil.staylockedin.backend.common.entity.BaseEntity;
import com.swapnil.staylockedin.backend.goal.entity.Goal;
import com.swapnil.staylockedin.backend.milestone.enums.MilestoneStatus;
import com.swapnil.staylockedin.backend.task.entity.Task;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "milestones")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Milestone extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private LocalDate targetDate;

    @Column(nullable = false)
    private Integer weight;

    @Column(nullable = false)
    private Integer completionPercentage = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MilestoneStatus status;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goal_id", nullable = false)
    private Goal goal;

    @JsonIgnore
    @OneToMany(mappedBy = "milestone")
    private List<Task> tasks = new ArrayList<>();
}