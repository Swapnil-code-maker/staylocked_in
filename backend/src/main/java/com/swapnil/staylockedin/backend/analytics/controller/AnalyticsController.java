package com.swapnil.staylockedin.backend.analytics.controller;

import com.swapnil.staylockedin.backend.analytics.dto.AnalyticsResponse;
import com.swapnil.staylockedin.backend.analytics.service.AnalyticsService;
import com.swapnil.staylockedin.backend.security.user.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping
    public AnalyticsResponse getAnalytics(
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        return analyticsService.getAnalytics(customUserDetails.getUser());
    }
}