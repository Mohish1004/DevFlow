package com.devflow.model;

import com.devflow.model.enums.Priority;
import com.devflow.model.enums.TaskStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dbId;

    private String id; // client-side ID string (e.g. task-auth-handoff)
    private String title;
    
    @Column(length = 2000)
    private String description;
    
    private String assignee;
    
    @Enumerated(EnumType.STRING)
    private TaskStatus status;
    
    @Enumerated(EnumType.STRING)
    private Priority priority;
    
    private String githubLink;
    private String deadline; // formatted as "yyyy-MM-dd"
    
    private int comments;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "task_id")
    private List<TaskCheckpoint> checkpoints = new ArrayList<>();

    public Task() {}

    public Task(Long dbId, String id, String title, String description, String assignee, TaskStatus status, Priority priority, String githubLink, String deadline, int comments, LocalDateTime createdAt, LocalDateTime updatedAt, List<TaskCheckpoint> checkpoints) {
        this.dbId = dbId;
        this.id = id;
        this.title = title;
        this.description = description;
        this.assignee = assignee;
        this.status = status;
        this.priority = priority;
        this.githubLink = githubLink;
        this.deadline = deadline;
        this.comments = comments;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.checkpoints = checkpoints != null ? checkpoints : new ArrayList<>();
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAssignee() {
        return assignee;
    }

    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public String getGithubLink() {
        return githubLink;
    }

    public void setGithubLink(String githubLink) {
        this.githubLink = githubLink;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public int getComments() {
        return comments;
    }

    public void setComments(int comments) {
        this.comments = comments;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<TaskCheckpoint> getCheckpoints() {
        return checkpoints;
    }

    public void setCheckpoints(List<TaskCheckpoint> checkpoints) {
        this.checkpoints = checkpoints;
    }

    public static TaskBuilder builder() {
        return new TaskBuilder();
    }

    public static class TaskBuilder {
        private Long dbId;
        private String id;
        private String title;
        private String description;
        private String assignee;
        private TaskStatus status;
        private Priority priority;
        private String githubLink;
        private String deadline;
        private int comments;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private List<TaskCheckpoint> checkpoints = new ArrayList<>();

        public TaskBuilder dbId(Long dbId) {
            this.dbId = dbId;
            return this;
        }

        public TaskBuilder id(String id) {
            this.id = id;
            return this;
        }

        public TaskBuilder title(String title) {
            this.title = title;
            return this;
        }

        public TaskBuilder description(String description) {
            this.description = description;
            return this;
        }

        public TaskBuilder assignee(String assignee) {
            this.assignee = assignee;
            return this;
        }

        public TaskBuilder status(TaskStatus status) {
            this.status = status;
            return this;
        }

        public TaskBuilder priority(Priority priority) {
            this.priority = priority;
            return this;
        }

        public TaskBuilder githubLink(String githubLink) {
            this.githubLink = githubLink;
            return this;
        }

        public TaskBuilder deadline(String deadline) {
            this.deadline = deadline;
            return this;
        }

        public TaskBuilder comments(int comments) {
            this.comments = comments;
            return this;
        }

        public TaskBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public TaskBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public TaskBuilder checkpoints(List<TaskCheckpoint> checkpoints) {
            this.checkpoints = checkpoints;
            return this;
        }

        public Task build() {
            return new Task(dbId, id, title, description, assignee, status, priority, githubLink, deadline, comments, createdAt, updatedAt, checkpoints);
        }
    }
}
