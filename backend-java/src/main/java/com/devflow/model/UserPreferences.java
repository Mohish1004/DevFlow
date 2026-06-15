package com.devflow.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_preferences")
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

    public UserPreferences() {}

    public UserPreferences(Long id, String themeMode, String fontStyle, String accentColor, boolean borderGlow, String cardColor, int glassIntensity, String graphColor, String textColor, User user) {
        this.id = id;
        this.themeMode = themeMode;
        this.fontStyle = fontStyle;
        this.accentColor = accentColor;
        this.borderGlow = borderGlow;
        this.cardColor = cardColor;
        this.glassIntensity = glassIntensity;
        this.graphColor = graphColor;
        this.textColor = textColor;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getThemeMode() {
        return themeMode;
    }

    public void setThemeMode(String themeMode) {
        this.themeMode = themeMode;
    }

    public String getFontStyle() {
        return fontStyle;
    }

    public void setFontStyle(String fontStyle) {
        this.fontStyle = fontStyle;
    }

    public String getAccentColor() {
        return accentColor;
    }

    public void setAccentColor(String accentColor) {
        this.accentColor = accentColor;
    }

    public boolean isBorderGlow() {
        return borderGlow;
    }

    public void setBorderGlow(boolean borderGlow) {
        this.borderGlow = borderGlow;
    }

    public String getCardColor() {
        return cardColor;
    }

    public void setCardColor(String cardColor) {
        this.cardColor = cardColor;
    }

    public int getGlassIntensity() {
        return glassIntensity;
    }

    public void setGlassIntensity(int glassIntensity) {
        this.glassIntensity = glassIntensity;
    }

    public String getGraphColor() {
        return graphColor;
    }

    public void setGraphColor(String graphColor) {
        this.graphColor = graphColor;
    }

    public String getTextColor() {
        return textColor;
    }

    public void setTextColor(String textColor) {
        this.textColor = textColor;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public static UserPreferencesBuilder builder() {
        return new UserPreferencesBuilder();
    }

    public static class UserPreferencesBuilder {
        private Long id;
        private String themeMode;
        private String fontStyle;
        private String accentColor;
        private boolean borderGlow;
        private String cardColor;
        private int glassIntensity;
        private String graphColor;
        private String textColor;
        private User user;

        public UserPreferencesBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public UserPreferencesBuilder themeMode(String themeMode) {
            this.themeMode = themeMode;
            return this;
        }

        public UserPreferencesBuilder fontStyle(String fontStyle) {
            this.fontStyle = fontStyle;
            return this;
        }

        public UserPreferencesBuilder accentColor(String accentColor) {
            this.accentColor = accentColor;
            return this;
        }

        public UserPreferencesBuilder borderGlow(boolean borderGlow) {
            this.borderGlow = borderGlow;
            return this;
        }

        public UserPreferencesBuilder cardColor(String cardColor) {
            this.cardColor = cardColor;
            return this;
        }

        public UserPreferencesBuilder glassIntensity(int glassIntensity) {
            this.glassIntensity = glassIntensity;
            return this;
        }

        public UserPreferencesBuilder graphColor(String graphColor) {
            this.graphColor = graphColor;
            return this;
        }

        public UserPreferencesBuilder textColor(String textColor) {
            this.textColor = textColor;
            return this;
        }

        public UserPreferencesBuilder user(User user) {
            this.user = user;
            return this;
        }

        public UserPreferences build() {
            return new UserPreferences(id, themeMode, fontStyle, accentColor, borderGlow, cardColor, glassIntensity, graphColor, textColor, user);
        }
    }
}
