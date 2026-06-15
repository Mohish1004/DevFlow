package com.devflow.model;

import com.devflow.model.enums.AccountType;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String displayName;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AccountType accountType;

    private String teamCode;
    private String teamName;
    private String organizationName;
    private String joinLink;
    private String mode = "db";

    public User() {}

    public User(Long id, String email, String displayName, String password, AccountType accountType, String teamCode, String teamName, String organizationName, String joinLink, String mode) {
        this.id = id;
        this.email = email;
        this.displayName = displayName;
        this.password = password;
        this.accountType = accountType;
        this.teamCode = teamCode;
        this.teamName = teamName;
        this.organizationName = organizationName;
        this.joinLink = joinLink;
        this.mode = mode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
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

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getJoinLink() {
        return joinLink;
    }

    public void setJoinLink(String joinLink) {
        this.joinLink = joinLink;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public static UserBuilder builder() {
        return new UserBuilder();
    }

    public static class UserBuilder {
        private Long id;
        private String email;
        private String displayName;
        private String password;
        private AccountType accountType;
        private String teamCode;
        private String teamName;
        private String organizationName;
        private String joinLink;
        private String mode = "db";

        public UserBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public UserBuilder email(String email) {
            this.email = email;
            return this;
        }

        public UserBuilder displayName(String displayName) {
            this.displayName = displayName;
            return this;
        }

        public UserBuilder password(String password) {
            this.password = password;
            return this;
        }

        public UserBuilder accountType(AccountType accountType) {
            this.accountType = accountType;
            return this;
        }

        public UserBuilder teamCode(String teamCode) {
            this.teamCode = teamCode;
            return this;
        }

        public UserBuilder teamName(String teamName) {
            this.teamName = teamName;
            return this;
        }

        public UserBuilder organizationName(String organizationName) {
            this.organizationName = organizationName;
            return this;
        }

        public UserBuilder joinLink(String joinLink) {
            this.joinLink = joinLink;
            return this;
        }

        public UserBuilder mode(String mode) {
            this.mode = mode;
            return this;
        }

        public User build() {
            return new User(id, email, displayName, password, accountType, teamCode, teamName, organizationName, joinLink, mode);
        }
    }
}
