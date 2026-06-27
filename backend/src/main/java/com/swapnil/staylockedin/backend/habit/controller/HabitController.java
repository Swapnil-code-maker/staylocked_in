package com.swapnil.staylockedin.backend.habit.controller;

import com.swapnil.staylockedin.backend.habit.dto.HabitCreateRequest;
import com.swapnil.staylockedin.backend.habit.dto.HabitResponse;
import com.swapnil.staylockedin.backend.habit.dto.HabitUpdateRequest;
import com.swapnil.staylockedin.backend.habit.service.HabitService;
import com.swapnil.staylockedin.backend.security.user.CustomUserDetails;
import com.swapnil.staylockedin.backend.user.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/habits")
@RequiredArgsConstructor
public class HabitController {

    private final HabitService habitService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HabitResponse createHabit(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @Valid @RequestBody HabitCreateRequest request) {

        User authenticatedUser = customUserDetails.getUser();

        return habitService.createHabit(request, authenticatedUser);
    }

    @GetMapping
    public List<HabitResponse> getAllHabits(
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        User authenticatedUser = customUserDetails.getUser();

        return habitService.getAllHabits(authenticatedUser);
    }

    @GetMapping("/{id}")
    public HabitResponse getHabitById(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable Long id) {

        User authenticatedUser = customUserDetails.getUser();

        return habitService.getHabitById(id, authenticatedUser);
    }

    @PutMapping("/{id}")
    public HabitResponse updateHabit(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable Long id,
            @Valid @RequestBody HabitUpdateRequest request) {

        User authenticatedUser = customUserDetails.getUser();

        return habitService.updateHabit(id, request, authenticatedUser);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteHabit(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable Long id) {

        User authenticatedUser = customUserDetails.getUser();

        habitService.deleteHabit(id, authenticatedUser);
    }

    @PostMapping("/{id}/complete")
    public HabitResponse completeHabit(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable Long id) {

        User authenticatedUser = customUserDetails.getUser();

        return habitService.completeHabit(id, authenticatedUser);
    }
}