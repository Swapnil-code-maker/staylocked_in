package com.swapnil.staylockedin.backend.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class LoginResponse {

    private String accessToken;

    private String tokenType;

    private Long userId;

    private String fullName;

    private String email;
}