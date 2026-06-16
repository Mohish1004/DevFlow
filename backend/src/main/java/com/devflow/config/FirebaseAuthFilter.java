package com.devflow.config;

import com.devflow.model.User;
import com.devflow.model.UserPreferences;
import com.devflow.model.enums.AccountType;
import com.devflow.repository.UserRepository;
import com.devflow.repository.UserPreferencesRepository;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class FirebaseAuthFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(FirebaseAuthFilter.class);

    private final UserRepository userRepository;
    private final UserPreferencesRepository userPreferencesRepository;

    public FirebaseAuthFilter(UserRepository userRepository,
                              UserPreferencesRepository userPreferencesRepository) {
        this.userRepository = userRepository;
        this.userPreferencesRepository = userPreferencesRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                FirebaseToken decoded = FirebaseAuth.getInstance().verifyIdToken(token);
                String email = decoded.getEmail();
                String name = decoded.getName();
                if (name == null || name.isBlank()) {
                    name = email;
                }
                if (email == null) {
                    chain.doFilter(request, response);
                    return;
                }
                User user = userRepository.findByEmail(email).orElseGet(() -> {
                    User newUser = User.builder()
                            .email(email)
                            .displayName(name)
                            .accountType(AccountType.SOLO_USER)
                            .mode("firebase")
                            .build();
                    User saved = userRepository.save(newUser);
                    UserPreferences prefs = UserPreferences.builder()
                            .themeMode("dark")
                            .fontStyle("dm-sans")
                            .accentColor("#00d4ff")
                            .borderGlow(true)
                            .cardColor("rgba(255,255,255,0.06)")
                            .glassIntensity(20)
                            .graphColor("#8b7be8")
                            .textColor("#f5f5f6")
                            .user(saved)
                            .build();
                    userPreferencesRepository.save(prefs);
                    log.info("Created new user from Firebase: {}", email);
                    return saved;
                });
                var auth = new UsernamePasswordAuthenticationToken(
                        user.getEmail(), null, Collections.emptyList());
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (Exception e) {
                log.debug("Firebase token verification failed: {}", e.getMessage());
                SecurityContextHolder.clearContext();
            }
        }
        chain.doFilter(request, response);
    }
}
