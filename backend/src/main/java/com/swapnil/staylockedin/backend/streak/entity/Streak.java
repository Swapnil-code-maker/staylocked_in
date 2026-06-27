package com.swapnil.staylockedin.backend.streak.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.swapnil.staylockedin.backend.common.entity.BaseEntity;
import com.swapnil.staylockedin.backend.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(
        name = "streaks",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "activity_date"})
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Streak extends BaseEntity {

    @Column(name = "activity_date", nullable = false)
    private LocalDate activityDate;

    @Column(nullable = false)
    @Builder.Default
    private Integer studyMinutes = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer tasksCompleted = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer habitsCompleted = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer goalsCompleted = 0;

    @Column(nullable = false)
    @Builder.Default
    private Boolean studyDay = false;

    @Column(nullable = false)
    @Builder.Default
    private Integer currentStreak = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer longestStreak = 0;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}