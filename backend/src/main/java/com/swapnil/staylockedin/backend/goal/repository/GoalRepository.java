package com.swapnil.staylockedin.backend.goal.repository;

import com.swapnil.staylockedin.backend.goal.entity.Goal;
import com.swapnil.staylockedin.backend.goal.enums.GoalStatus;
import com.swapnil.staylockedin.backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GoalRepository extends JpaRepository<Goal, Long> {

    Optional<Goal> findByIdAndUser(Long id, User user);

    List<Goal> findByUser(User user);

    long countByUser(User user);

    long countByUserAndStatus(User user, GoalStatus status);
}