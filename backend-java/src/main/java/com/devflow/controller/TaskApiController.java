package com.devflow.controller;

import com.devflow.model.Task;
import com.devflow.model.TaskCheckpoint;
import com.devflow.model.enums.Priority;
import com.devflow.model.enums.TaskStatus;
import com.devflow.repository.TaskRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/tasks")
public class TaskApiController {

    private final TaskRepository taskRepository;

    public TaskApiController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        if (task.getId() == null) {
            task.setId("task-" + UUID.randomUUID().toString().substring(0, 8));
        }
        task.setCreatedAt(LocalDateTime.now());
        task.setUpdatedAt(LocalDateTime.now());
        
        if (task.getCheckpoints() != null) {
            for (int i = 0; i < task.getCheckpoints().size(); i++) {
                TaskCheckpoint cp = task.getCheckpoints().get(i);
                if (cp.getId() == null) {
                    cp.setId(task.getId() + "-cp-" + i);
                }
            }
        }
        
        Task saved = taskRepository.save(task);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable("id") String id, @RequestBody Task taskDetails) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Task task = optionalTask.get();
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setAssignee(taskDetails.getAssignee());
        task.setStatus(taskDetails.getStatus());
        task.setPriority(taskDetails.getPriority());
        task.setGithubLink(taskDetails.getGithubLink());
        task.setDeadline(taskDetails.getDeadline());
        task.setUpdatedAt(LocalDateTime.now());

        if (taskDetails.getCheckpoints() != null) {
            task.getCheckpoints().clear();
            for (int i = 0; i < taskDetails.getCheckpoints().size(); i++) {
                TaskCheckpoint cp = taskDetails.getCheckpoints().get(i);
                if (cp.getId() == null) {
                    cp.setId(task.getId() + "-cp-" + i);
                }
                task.getCheckpoints().add(cp);
            }
        }

        Task updated = taskRepository.save(task);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Task> updateTaskStatus(@PathVariable("id") String id, @RequestParam("status") String statusStr) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Task task = optionalTask.get();
        try {
            TaskStatus status = TaskStatus.valueOf(statusStr.toUpperCase().replace(" ", "_"));
            task.setStatus(status);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
        
        task.setUpdatedAt(LocalDateTime.now());
        Task updated = taskRepository.save(task);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/{id}/checkpoints/{cpId}/toggle")
    public ResponseEntity<Task> toggleCheckpoint(@PathVariable("id") String id, @PathVariable("cpId") String cpId) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Task task = optionalTask.get();
        for (TaskCheckpoint cp : task.getCheckpoints()) {
            if (cp.getId().equals(cpId)) {
                cp.setCompleted(!cp.isCompleted());
                break;
            }
        }
        
        task.setUpdatedAt(LocalDateTime.now());
        Task updated = taskRepository.save(task);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable("id") String id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        taskRepository.delete(optionalTask.get());
        return ResponseEntity.noContent().build();
    }
}
