package com.devflow.model;

import jakarta.persistence.*;

@Entity
@Table(name = "task_checkpoints")
public class TaskCheckpoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dbId;

    private String id; // client-side ID string (e.g. cp-auth-1)
    private String title;
    private boolean completed;

    public TaskCheckpoint() {}

    public TaskCheckpoint(Long dbId, String id, String title, boolean completed) {
        this.dbId = dbId;
        this.id = id;
        this.title = title;
        this.completed = completed;
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

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public static TaskCheckpointBuilder builder() {
        return new TaskCheckpointBuilder();
    }

    public static class TaskCheckpointBuilder {
        private Long dbId;
        private String id;
        private String title;
        private boolean completed;

        public TaskCheckpointBuilder dbId(Long dbId) {
            this.dbId = dbId;
            return this;
        }

        public TaskCheckpointBuilder id(String id) {
            this.id = id;
            return this;
        }

        public TaskCheckpointBuilder title(String title) {
            this.title = title;
            return this;
        }

        public TaskCheckpointBuilder completed(boolean completed) {
            this.completed = completed;
            return this;
        }

        public TaskCheckpoint build() {
            return new TaskCheckpoint(dbId, id, title, completed);
        }
    }
}
