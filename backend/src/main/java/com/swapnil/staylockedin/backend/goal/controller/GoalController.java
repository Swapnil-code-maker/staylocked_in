package com.swapnil.staylockedin.backend.goal.controller;

import com.swapnil.staylockedin.backend.goal.dto.GoalCreateRequest;
import com.swapnil.staylockedin.backend.goal.dto.GoalResponse;
import com.swapnil.staylockedin.backend.goal.dto.GoalUpdateRequest;
import com.swapnil.staylockedin.backend.goal.service.GoalService;
import com.swapnil.staylockedin.backend.security.user.CustomUserDetails;
import com.swapnil.staylockedin.backend.user.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;

    @PostMapping
    public GoalResponse createGoal(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @Valid @RequestBody GoalCreateRequest request) {

        User authenticatedUser = customUserDetails.getUser();

        return goalService.createGoal(request, authenticatedUser);
    }

    @GetMapping
    public List<GoalResponse> getAllGoals(
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        User authenticatedUser = customUserDetails.getUser();

        return goalService.getAllGoals(authenticatedUser);
    }

    @GetMapping("/{id}")
    public GoalResponse getGoalById(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable Long id) {

        User authenticatedUser = customUserDetails.getUser();

        return goalService.getGoalById(id, authenticatedUser);
    }

    @PutMapping("/{id}")
    public GoalResponse updateGoal(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable Long id,
            @Valid @RequestBody GoalUpdateRequest request) {

        User authenticatedUser = customUserDetails.getUser();

        return goalService.updateGoal(id, request, authenticatedUser);
    }

    @DeleteMapping("/{id}")
    public void deleteGoal(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable Long id) {

        User authenticatedUser = customUserDetails.getUser();

        goalService.deleteGoal(id, authenticatedUser);
    }
}