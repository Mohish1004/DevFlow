package com.devflow.model;

import com.devflow.model.enums.AccountType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
    
    @Builder.Default
    private String mode = "db";
}
