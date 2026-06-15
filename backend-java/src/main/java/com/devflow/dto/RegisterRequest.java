package com.devflow.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String accountType; // team_leader, team_member, solo_user, organization_admin
    private String displayName;
    private String email;
    private String password;
    private String organizationName;
    private String teamCode;
    private String teamName;
}
