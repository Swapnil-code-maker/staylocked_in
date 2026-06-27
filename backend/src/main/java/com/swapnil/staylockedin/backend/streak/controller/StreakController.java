package com.swapnil.staylockedin.backend.streak.controller;

import com.swapnil.staylockedin.backend.security.user.CustomUserDetails;
import com.swapnil.staylockedin.backend.streak.dto.StreakResponse;
import com.swapnil.staylockedin.backend.streak.service.StreakService;
import com.swapnil.staylockedin.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/streaks")
@RequiredArgsConstructor
public class StreakController {

    private final StreakService streakService;

    @PostMapping("/study")
    public StreakResponse markStudyDay(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestParam Integer studyMinutes) {

        User authenticatedUser = customUserDetails.getUser();

        return streakService.markStudyDay(authenticatedUser, studyMinutes);
    }

    @GetMapping("/today")
    public StreakResponse getToday(
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        User authenticatedUser = customUserDetails.getUser();

        return streakService.getToday(authenticatedUser);
    }

    @GetMapping("/history")
    public List<StreakResponse> getUserHistory(
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        User authenticatedUser = customUserDetails.getUser();

        return streakService.getUserHistory(authenticatedUser);
    }
}