package com.swapnil.staylockedin.backend.milestone.repository;

import com.swapnil.staylockedin.backend.goal.entity.Goal;
import com.swapnil.staylockedin.backend.milestone.entity.Milestone;
import com.swapnil.staylockedin.backend.milestone.enums.MilestoneStatus;
import com.swapnil.staylockedin.backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MilestoneRepository extends JpaRepository<Milestone, Long> {

    List<Milestone> findByGoal(Goal goal);

    Optional<Milestone> findByIdAndGoalUser(Long id, User user);

    List<Milestone> findByGoalUser(User user);

    long countByGoal(Goal goal);

    long countByGoalAndStatus(Goal goal, MilestoneStatus status);

    long countByGoalUser(User user);

    long countByGoalUserAndStatus(User user, MilestoneStatus status);
}