package com.devflow.model;

import com.devflow.model.enums.Priority;
import com.devflow.model.enums.TaskStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tasks")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
    @Builder.Default
    private List<TaskCheckpoint> checkpoints = new ArrayList<>();
}
