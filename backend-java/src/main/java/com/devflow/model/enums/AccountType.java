package com.devflow.model.enums;

public enum AccountType {
    TEAM_LEADER("team_leader", "Team Leader"),
    TEAM_MEMBER("team_member", "Team Member"),
    SOLO_USER("solo_user", "Solo User"),
    ORGANIZATION_ADMIN("organization_admin", "Organization Admin");

    private final String value;
    private final String displayName;

    AccountType(String value, String displayName) {
        this.value = value;
        this.displayName = displayName;
    }

    public String getValue() {
        return value;
    }

    public String getDisplayName() {
        return displayName;
    }
}
