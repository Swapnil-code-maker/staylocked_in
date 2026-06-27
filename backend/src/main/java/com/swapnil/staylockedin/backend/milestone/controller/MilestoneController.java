package com.swapnil.staylockedin.backend.milestone.controller;

import com.swapnil.staylockedin.backend.milestone.dto.MilestoneCreateRequest;
import com.swapnil.staylockedin.backend.milestone.dto.MilestoneResponse;
import com.swapnil.staylockedin.backend.milestone.dto.MilestoneUpdateRequest;
import com.swapnil.staylockedin.backend.milestone.service.MilestoneService;
import com.swapnil.staylockedin.backend.security.user.CustomUserDetails;
import com.swapnil.staylockedin.backend.user.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/milestones")
@RequiredArgsConstructor
public class MilestoneController {

    private final MilestoneService milestoneService;

    @PostMapping
    public MilestoneResponse createMilestone(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @Valid @RequestBody MilestoneCreateRequest request) {

        User authenticatedUser = customUserDetails.getUser();

        return milestoneService.createMilestone(request, authenticatedUser);
    }

    @GetMapping
    public List<MilestoneResponse> getAllMilestones(
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        User authenticatedUser = customUserDetails.getUser();

        return milestoneService.getAllMilestones(authenticatedUser);
    }

    @GetMapping("/{id}")
    public MilestoneResponse getMilestoneById(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable Long id) {

        User authenticatedUser = customUserDetails.getUser();

        return milestoneService.getMilestoneById(id, authenticatedUser);
    }

    @PutMapping("/{id}")
    public MilestoneResponse updateMilestone(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable Long id,
            @Valid @RequestBody MilestoneUpdateRequest request) {

        User authenticatedUser = customUserDetails.getUser();

        return milestoneService.updateMilestone(id, request, authenticatedUser);
    }

    @DeleteMapping("/{id}")
    public void deleteMilestone(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable Long id) {

        User authenticatedUser = customUserDetails.getUser();

        milestoneService.deleteMilestone(id, authenticatedUser);
    }
}