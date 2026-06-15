package com.devflow.controller;

import com.devflow.model.User;
import com.devflow.model.UserPreferences;
import com.devflow.repository.UserRepository;
import com.devflow.repository.UserPreferencesRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/api/preferences")
public class PreferencesApiController {

    private final UserRepository userRepository;
    private final UserPreferencesRepository userPreferencesRepository;

    public PreferencesApiController(UserRepository userRepository, 
                                    UserPreferencesRepository userPreferencesRepository) {
        this.userRepository = userRepository;
        this.userPreferencesRepository = userPreferencesRepository;
    }

    @GetMapping
    public ResponseEntity<UserPreferences> getPreferences(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }
        Optional<User> optionalUser = userRepository.findByEmail(principal.getName());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        UserPreferences prefs = userPreferencesRepository.findByUser(optionalUser.get())
                .orElseGet(() -> UserPreferences.builder().user(optionalUser.get()).build());
        return ResponseEntity.ok(prefs);
    }

    @PostMapping
    public ResponseEntity<UserPreferences> updatePreferences(@RequestBody UserPreferences newPrefs, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }
        Optional<User> optionalUser = userRepository.findByEmail(principal.getName());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = optionalUser.get();
        UserPreferences prefs = userPreferencesRepository.findByUser(user)
                .orElseGet(() -> {
                    UserPreferences p = new UserPreferences();
                    p.setUser(user);
                    return p;
                });

        prefs.setThemeMode(newPrefs.getThemeMode());
        prefs.setFontStyle(newPrefs.getFontStyle());
        prefs.setAccentColor(newPrefs.getAccentColor());
        prefs.setBorderGlow(newPrefs.isBorderGlow());
        prefs.setCardColor(newPrefs.getCardColor());
        prefs.setGlassIntensity(newPrefs.getGlassIntensity());
        prefs.setGraphColor(newPrefs.getGraphColor());
        prefs.setTextColor(newPrefs.getTextColor());

        UserPreferences saved = userPreferencesRepository.save(prefs);
        return ResponseEntity.ok(saved);
    }
}
