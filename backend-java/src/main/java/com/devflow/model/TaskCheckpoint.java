package com.devflow.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "task_checkpoints")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskCheckpoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dbId;

    private String id; // client-side ID string (e.g. cp-auth-1)
    private String title;
    private boolean completed;
}
