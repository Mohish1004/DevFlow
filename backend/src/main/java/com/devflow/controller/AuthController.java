package com.devflow.controller;

import com.devflow.dto.RegisterRequest;
import com.devflow.model.User;
import com.devflow.model.UserPreferences;
import com.devflow.model.enums.AccountType;
import com.devflow.repository.UserRepository;
import com.devflow.repository.UserPreferencesRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@Controller
public class AuthController {

    private final UserRepository userRepository;
    private final UserPreferencesRepository userPreferencesRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, 
                          UserPreferencesRepository userPreferencesRepository, 
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userPreferencesRepository = userPreferencesRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        return !(authentication.getPrincipal() instanceof String && 
                 authentication.getPrincipal().equals("anonymousUser"));
    }

    @GetMapping("/login")
    public String login(Model model, 
                        @RequestParam(value = "error", required = false) String error,
                        @RequestParam(value = "logout", required = false) String logout,
                        @RequestParam(value = "registered", required = false) String registered) {
        if (isAuthenticated()) {
            return "redirect:/app/dashboard";
        }
        if (error != null) {
            model.addAttribute("errorMessage", "Invalid email or password.");
        }
        if (logout != null) {
            model.addAttribute("successMessage", "You have been logged out successfully.");
        }
        if (registered != null) {
            model.addAttribute("successMessage", "Registration successful! Please log in.");
        }
        return "login";
    }

    @GetMapping("/signup")
    public String signup(Model model) {
        if (isAuthenticated()) {
            return "redirect:/app/dashboard";
        }
        model.addAttribute("registerRequest", new RegisterRequest());
        return "signup";
    }

    @GetMapping("/register")
    public String registerRedirect() {
        return "redirect:/signup";
    }

    @GetMapping("/join/{code}")
    public String joinWithCode(@PathVariable("code") String code, Model model) {
        if (isAuthenticated()) {
            return "redirect:/app/dashboard";
        }
        RegisterRequest request = new RegisterRequest();
        request.setAccountType("team_member");
        request.setTeamCode(code);
        model.addAttribute("registerRequest", request);
        model.addAttribute("prefilledCode", code);
        return "signup";
    }

    @PostMapping("/register")
    public String processRegister(@ModelAttribute("registerRequest") RegisterRequest request, Model model) {
        if (userRepository.existsByEmail(request.getEmail())) {
            model.addAttribute("errorMessage", "Email is already in use.");
            return "signup";
        }

        AccountType type;
        try {
            type = AccountType.valueOf(request.getAccountType().toUpperCase());
        } catch (IllegalArgumentException e) {
            type = AccountType.SOLO_USER;
        }

        String teamCode = null;
        if (type == AccountType.TEAM_LEADER || type == AccountType.ORGANIZATION_ADMIN) {
            teamCode = "DEV-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        } else if (type == AccountType.TEAM_MEMBER) {
            teamCode = request.getTeamCode();
            if (teamCode == null || teamCode.trim().isEmpty()) {
                model.addAttribute("errorMessage", "Team code is required for team members.");
                return "signup";
            }
        }

        User user = User.builder()
                .email(request.getEmail())
                .displayName(request.getDisplayName())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountType(type)
                .organizationName(request.getOrganizationName())
                .teamName(request.getTeamName())
                .teamCode(teamCode)
                .joinLink(teamCode != null ? "http://localhost:8080/join/" + teamCode : null)
                .mode("db")
                .build();

        userRepository.save(user);

        // Save default user preferences
        UserPreferences prefs = UserPreferences.builder()
                .themeMode("dark")
                .fontStyle("dm-sans")
                .accentColor("#a764ff")
                .borderGlow(true)
                .cardColor("rgba(255,255,255,0.06)")
                .glassIntensity(20)
                .graphColor("#8b7be8")
                .textColor("#f5f5f6")
                .user(user)
                .build();
        userPreferencesRepository.save(prefs);

        return "redirect:/login?registered=true";
    }
}
