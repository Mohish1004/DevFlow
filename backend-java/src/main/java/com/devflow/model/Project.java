package com.devflow.model;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String repo;
    
    @Column(length = 2000)
    private String summary;

    public Project() {}

    public Project(Long id, String name, String repo, String summary) {
        this.id = id;
        this.name = name;
        this.repo = repo;
        this.summary = summary;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRepo() {
        return repo;
    }

    public void setRepo(String repo) {
        this.repo = repo;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public static ProjectBuilder builder() {
        return new ProjectBuilder();
    }

    public static class ProjectBuilder {
        private Long id;
        private String name;
        private String repo;
        private String summary;

        public ProjectBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public ProjectBuilder name(String name) {
            this.name = name;
            return this;
        }

        public ProjectBuilder repo(String repo) {
            this.repo = repo;
            return this;
        }

        public ProjectBuilder summary(String summary) {
            this.summary = summary;
            return this;
        }

        public Project build() {
            return new Project(id, name, repo, summary);
        }
    }
}
