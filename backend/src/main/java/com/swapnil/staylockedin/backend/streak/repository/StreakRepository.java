package com.swapnil.staylockedin.backend.streak.repository;

import com.swapnil.staylockedin.backend.streak.entity.Streak;
import com.swapnil.staylockedin.backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface StreakRepository extends JpaRepository<Streak, Long> {

    Optional<Streak> findByUserAndActivityDate(User user, LocalDate activityDate);

    List<Streak> findByUserOrderByActivityDateDesc(User user);

    Optional<Streak> findFirstByUserOrderByActivityDateDesc(User user);

    List<Streak> findByUser(User user);

    boolean existsByUserAndActivityDate(User user, LocalDate activityDate);
}