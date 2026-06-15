package com.devflow.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_preferences")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPreferences {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String themeMode; // light, minimalist, dark, darker
    private String fontStyle;  // dm-sans, mono, system
    private String accentColor;
    private boolean borderGlow;
    private String cardColor;
    private int glassIntensity;
    private String graphColor;
    private String textColor;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
