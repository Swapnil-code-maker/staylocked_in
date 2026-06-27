package com.swapnil.staylockedin.backend.user.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class UserResponse {

    private Long id;

    private String fullName;

    private String email;

    private LocalDate dateOfBirth;

    private boolean emailVerified;

    private boolean enabled;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}