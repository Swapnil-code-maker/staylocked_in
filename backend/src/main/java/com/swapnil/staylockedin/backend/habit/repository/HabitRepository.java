package com.swapnil.staylockedin.backend.habit.repository;

import com.swapnil.staylockedin.backend.habit.entity.Habit;
import com.swapnil.staylockedin.backend.habit.enums.HabitStatus;
import com.swapnil.staylockedin.backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HabitRepository extends JpaRepository<Habit, Long> {

    List<Habit> findByUser(User user);

    Optional<Habit> findByIdAndUser(Long id, User user);

    long countByUser(User user);

    long countByUserAndStatus(User user, HabitStatus status);
}