package com.swapnil.staylockedin.backend.habit.service;

import com.swapnil.staylockedin.backend.exception.ResourceNotFoundException;
import com.swapnil.staylockedin.backend.habit.dto.HabitCreateRequest;
import com.swapnil.staylockedin.backend.habit.dto.HabitResponse;
import com.swapnil.staylockedin.backend.habit.dto.HabitUpdateRequest;
import com.swapnil.staylockedin.backend.habit.entity.Habit;
import com.swapnil.staylockedin.backend.habit.enums.HabitStatus;
import com.swapnil.staylockedin.backend.habit.mapper.HabitMapper;
import com.swapnil.staylockedin.backend.habit.repository.HabitRepository;
import com.swapnil.staylockedin.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HabitService {

    private final HabitRepository habitRepository;

    public HabitResponse createHabit(HabitCreateRequest request,
                                     User authenticatedUser) {

        Habit habit = Habit.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .frequency(request.getFrequency())
                .status(HabitStatus.ACTIVE)
                .currentStreak(0)
                .longestStreak(0)
                .user(authenticatedUser)
                .build();

        Habit savedHabit = habitRepository.save(habit);

        return HabitMapper.toResponse(savedHabit);
    }

    public List<HabitResponse> getAllHabits(User authenticatedUser) {

        return habitRepository.findByUser(authenticatedUser)
                .stream()
                .map(HabitMapper::toResponse)
                .toList();
    }

    public HabitResponse getHabitById(Long id,
                                      User authenticatedUser) {

        Habit habit = habitRepository.findByIdAndUser(id, authenticatedUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Habit",
                                id));

        return HabitMapper.toResponse(habit);
    }

    public HabitResponse updateHabit(Long habitId,
                                     HabitUpdateRequest request,
                                     User authenticatedUser) {

        Habit habit = habitRepository.findByIdAndUser(habitId, authenticatedUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Habit",
                                habitId));

        habit.setTitle(request.getTitle());
        habit.setDescription(request.getDescription());
        habit.setFrequency(request.getFrequency());
        habit.setStatus(request.getStatus());

        Habit updatedHabit = habitRepository.save(habit);

        return HabitMapper.toResponse(updatedHabit);
    }

    public void deleteHabit(Long habitId,
                            User authenticatedUser) {

        Habit habit = habitRepository.findByIdAndUser(habitId, authenticatedUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Habit",
                                habitId));

        habitRepository.delete(habit);
    }

    public HabitResponse completeHabit(Long habitId,
                                       User authenticatedUser) {

        Habit habit = habitRepository.findByIdAndUser(habitId, authenticatedUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Habit",
                                habitId));

        LocalDate today = LocalDate.now();

        if (habit.getLastCompletedDate() == null) {

            habit.setCurrentStreak(1);
            habit.setLongestStreak(1);

        } else if (habit.getLastCompletedDate().plusDays(1).equals(today)) {

            int streak = habit.getCurrentStreak() + 1;

            habit.setCurrentStreak(streak);

            if (streak > habit.getLongestStreak()) {
                habit.setLongestStreak(streak);
            }

        } else if (!habit.getLastCompletedDate().equals(today)) {

            habit.setCurrentStreak(1);
        }

        // Intentionally DO NOT change status to COMPLETED.
        // Status remains ACTIVE as per project design.

        habit.setLastCompletedDate(today);

        Habit updatedHabit = habitRepository.save(habit);

        return HabitMapper.toResponse(updatedHabit);
    }
}