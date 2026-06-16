package com.devflow.model;

import com.devflow.model.enums.ReviewStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
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

    public Review() {}

    public Review(Long dbId, String id, String taskTitle, String message, String reviewer, String submittedBy, LocalDateTime submittedAt, String githubLink, ReviewStatus status) {
        this.dbId = dbId;
        this.id = id;
        this.taskTitle = taskTitle;
        this.message = message;
        this.reviewer = reviewer;
        this.submittedBy = submittedBy;
        this.submittedAt = submittedAt;
        this.githubLink = githubLink;
        this.status = status;
    }

    public Long getDbId() {
        return dbId;
    }

    public void setDbId(Long dbId) {
        this.dbId = dbId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTaskTitle() {
        return taskTitle;
    }

    public void setTaskTitle(String taskTitle) {
        this.taskTitle = taskTitle;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getReviewer() {
        return reviewer;
    }

    public void setReviewer(String reviewer) {
        this.reviewer = reviewer;
    }

    public String getSubmittedBy() {
        return submittedBy;
    }

    public void setSubmittedBy(String submittedBy) {
        this.submittedBy = submittedBy;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public String getGithubLink() {
        return githubLink;
    }

    public void setGithubLink(String githubLink) {
        this.githubLink = githubLink;
    }

    public ReviewStatus getStatus() {
        return status;
    }

    public void setStatus(ReviewStatus status) {
        this.status = status;
    }

    public static ReviewBuilder builder() {
        return new ReviewBuilder();
    }

    public static class ReviewBuilder {
        private Long dbId;
        private String id;
        private String taskTitle;
        private String message;
        private String reviewer;
        private String submittedBy;
        private LocalDateTime submittedAt;
        private String githubLink;
        private ReviewStatus status;

        public ReviewBuilder dbId(Long dbId) {
            this.dbId = dbId;
            return this;
        }

        public ReviewBuilder id(String id) {
            this.id = id;
            return this;
        }

        public ReviewBuilder taskTitle(String taskTitle) {
            this.taskTitle = taskTitle;
            return this;
        }

        public ReviewBuilder message(String message) {
            this.message = message;
            return this;
        }

        public ReviewBuilder reviewer(String reviewer) {
            this.reviewer = reviewer;
            return this;
        }

        public ReviewBuilder submittedBy(String submittedBy) {
            this.submittedBy = submittedBy;
            return this;
        }

        public ReviewBuilder submittedAt(LocalDateTime submittedAt) {
            this.submittedAt = submittedAt;
            return this;
        }

        public ReviewBuilder githubLink(String githubLink) {
            this.githubLink = githubLink;
            return this;
        }

        public ReviewBuilder status(ReviewStatus status) {
            this.status = status;
            return this;
        }

        public Review build() {
            return new Review(dbId, id, taskTitle, message, reviewer, submittedBy, submittedAt, githubLink, status);
        }
    }
}
