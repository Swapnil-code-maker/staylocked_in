package com.swapnil.staylockedin.backend.task.repository;

import com.swapnil.staylockedin.backend.milestone.entity.Milestone;
import com.swapnil.staylockedin.backend.task.entity.Task;
import com.swapnil.staylockedin.backend.task.enums.TaskStatus;
import com.swapnil.staylockedin.backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByMilestone(Milestone milestone);

    Optional<Task> findByIdAndMilestoneGoalUser(Long id, User user);

    List<Task> findByMilestoneGoalUser(User user);

    @Query("""
            SELECT COUNT(t)
            FROM Task t
            WHERE t.milestone.goal.user.id = :userId
            """)
    long countByUserId(@Param("userId") Long userId);

    @Query("""
            SELECT COUNT(t)
            FROM Task t
            WHERE t.milestone.goal.user.id = :userId
              AND t.status = :status
            """)
    long countByUserIdAndStatus(
            @Param("userId") Long userId,
            @Param("status") TaskStatus status
    );

    @Query("""
            SELECT COUNT(t)
            FROM Task t
            WHERE t.milestone.goal.user.id = :userId
              AND t.status = :status
              AND t.completedAt BETWEEN :start AND :end
            """)
    long countByUserIdAndStatusAndCompletedAtBetween(
            @Param("userId") Long userId,
            @Param("status") TaskStatus status,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );
}