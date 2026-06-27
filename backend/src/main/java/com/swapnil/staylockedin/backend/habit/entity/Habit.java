package com.swapnil.staylockedin.backend.habit.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.swapnil.staylockedin.backend.common.entity.BaseEntity;
import com.swapnil.staylockedin.backend.habit.enums.HabitFrequency;
import com.swapnil.staylockedin.backend.habit.enums.HabitStatus;
import com.swapnil.staylockedin.backend.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "habits")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Habit extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private HabitFrequency frequency;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private HabitStatus status;

    @Column(nullable = false)
    @Builder.Default
    private Integer currentStreak = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer longestStreak = 0;

    private LocalDate lastCompletedDate;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}