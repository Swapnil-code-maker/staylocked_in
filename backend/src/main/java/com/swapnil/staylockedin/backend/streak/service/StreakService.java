package com.swapnil.staylockedin.backend.streak.service;

import com.swapnil.staylockedin.backend.exception.ResourceNotFoundException;
import com.swapnil.staylockedin.backend.streak.dto.StreakResponse;
import com.swapnil.staylockedin.backend.streak.entity.Streak;
import com.swapnil.staylockedin.backend.streak.mapper.StreakMapper;
import com.swapnil.staylockedin.backend.streak.repository.StreakRepository;
import com.swapnil.staylockedin.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StreakService {

    private final StreakRepository streakRepository;

    public StreakResponse markStudyDay(User authenticatedUser,
                                       Integer studyMinutes) {

        LocalDate today = LocalDate.now();

        Streak streak = streakRepository
                .findByUserAndActivityDate(authenticatedUser, today)
                .orElseGet(() -> Streak.builder()
                        .user(authenticatedUser)
                        .activityDate(today)
                        .studyMinutes(0)
                        .tasksCompleted(0)
                        .habitsCompleted(0)
                        .goalsCompleted(0)
                        .studyDay(false)
                        .currentStreak(0)
                        .longestStreak(0)
                        .build());

        streak.setStudyMinutes(streak.getStudyMinutes() + studyMinutes);
        streak.setStudyDay(true);

        LocalDate yesterday = today.minusDays(1);

        streakRepository.findByUserAndActivityDate(authenticatedUser, yesterday)
                .ifPresentOrElse(previous -> {

                    int current = previous.getCurrentStreak() + 1;

                    streak.setCurrentStreak(current);

                    streak.setLongestStreak(
                            Math.max(current, previous.getLongestStreak())
                    );

                }, () -> {

                    streak.setCurrentStreak(1);

                    streak.setLongestStreak(
                            Math.max(1, streak.getLongestStreak())
                    );

                });

        Streak saved = streakRepository.save(streak);

        return StreakMapper.toResponse(saved);
    }

    public List<StreakResponse> getUserHistory(User authenticatedUser) {

        return streakRepository.findByUserOrderByActivityDateDesc(authenticatedUser)
                .stream()
                .map(StreakMapper::toResponse)
                .toList();
    }

    public StreakResponse getToday(User authenticatedUser) {

        Streak streak = streakRepository
                .findByUserAndActivityDate(authenticatedUser, LocalDate.now())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Today's streak",
                                authenticatedUser.getId()));

        return StreakMapper.toResponse(streak);
    }
}