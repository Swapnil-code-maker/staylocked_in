package com.swapnil.staylockedin.backend.dashboard.controller;

import com.swapnil.staylockedin.backend.dashboard.dto.DashboardResponse;
import com.swapnil.staylockedin.backend.dashboard.service.DashboardService;
import com.swapnil.staylockedin.backend.security.user.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public DashboardResponse getDashboard(
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        return dashboardService.getDashboardData(
                customUserDetails.getUser()
        );
    }
}