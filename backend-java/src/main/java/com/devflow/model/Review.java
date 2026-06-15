package com.devflow.model;

import com.devflow.model.enums.ReviewStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dbId;

    private String id; // client-side ID string (e.g. review-auth-handoff)
    private String taskTitle;
    
    @Column(length = 2000)
    private String message;
    
    private String reviewer;
    private String submittedBy;
    private LocalDateTime submittedAt;
    private String githubLink;

    @Enumerated(EnumType.STRING)
    private ReviewStatus status;
}
