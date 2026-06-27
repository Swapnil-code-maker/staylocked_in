package com.swapnil.staylockedin.backend.goal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.swapnil.staylockedin.backend.common.entity.BaseEntity;
import com.swapnil.staylockedin.backend.goal.enums.GoalCategory;
import com.swapnil.staylockedin.backend.goal.enums.GoalPriority;
import com.swapnil.staylockedin.backend.goal.enums.GoalStatus;
import com.swapnil.staylockedin.backend.milestone.entity.Milestone;
import com.swapnil.staylockedin.backend.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "goals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Goal extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private LocalDate targetDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GoalStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GoalPriority priority;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GoalCategory category;

    @Column(nullable = false)
    private Integer completionPercentage = 0;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "goal")
    private List<Milestone> milestones = new ArrayList<>();
}