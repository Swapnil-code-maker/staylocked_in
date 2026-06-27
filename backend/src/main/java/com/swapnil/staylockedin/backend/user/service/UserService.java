package com.swapnil.staylockedin.backend.user.service;

import com.swapnil.staylockedin.backend.exception.DuplicateResourceException;
import com.swapnil.staylockedin.backend.user.dto.RegisterRequest;
import com.swapnil.staylockedin.backend.user.dto.UserResponse;
import com.swapnil.staylockedin.backend.user.entity.User;
import com.swapnil.staylockedin.backend.user.mapper.UserMapper;
import com.swapnil.staylockedin.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException(
                    "User",
                    "email",
                    request.getEmail()
            );
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .dateOfBirth(request.getDateOfBirth())
                .emailVerified(false)
                .enabled(true)
                .build();

        User savedUser = userRepository.save(user);

        return UserMapper.toResponse(savedUser);
    }
}