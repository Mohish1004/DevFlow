package com.devflow.dto;

public class RegisterRequest {
    private String accountType; // team_leader, team_member, solo_user, organization_admin
    private String displayName;
    private String email;
    private String password;
    private String organizationName;
    private String teamCode;
    private String teamName;

    public RegisterRequest() {}

    public RegisterRequest(String accountType, String displayName, String email, String password, String organizationName, String teamCode, String teamName) {
        this.accountType = accountType;
        this.displayName = displayName;
        this.email = email;
        this.password = password;
        this.organizationName = organizationName;
        this.teamCode = teamCode;
        this.teamName = teamName;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getTeamCode() {
        return teamCode;
    }

    public void setTeamCode(String teamCode) {
        this.teamCode = teamCode;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }
}
