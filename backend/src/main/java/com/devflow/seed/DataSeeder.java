package com.devflow.seed;

import com.devflow.model.*;
import com.devflow.model.enums.*;
import com.devflow.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final ReviewRepository reviewRepository;
    private final ProjectRepository projectRepository;
    private final UserPreferencesRepository userPreferencesRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, TaskRepository taskRepository,
                      ReviewRepository reviewRepository, ProjectRepository projectRepository,
                      UserPreferencesRepository userPreferencesRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.reviewRepository = reviewRepository;
        this.projectRepository = projectRepository;
        this.userPreferencesRepository = userPreferencesRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Seed default demo user if not present
        if (!userRepository.existsByEmail("demo@team.dev")) {
            User demoUser = User.builder()
                    .email("demo@team.dev")
                    .displayName("Ava")
                    .password(passwordEncoder.encode("password123"))
                    .accountType(AccountType.TEAM_LEADER)
                    .teamCode("DEV-DEMO")
                    .teamName("Demo Workspace")
                    .organizationName("DevFlow Org")
                    .joinLink("http://localhost:8080/join/DEV-DEMO")
                    .mode("demo")
                    .build();
            userRepository.save(demoUser);

            UserPreferences prefs = UserPreferences.builder()
                    .themeMode("dark")
                    .fontStyle("dm-sans")
                    .accentColor("#a764ff")
                    .borderGlow(true)
                    .cardColor("rgba(255,255,255,0.06)")
                    .glassIntensity(20)
                    .graphColor("#8b7be8")
                    .textColor("#f5f5f6")
                    .user(demoUser)
                    .build();
            userPreferencesRepository.save(prefs);
        }

        // Seed Projects
        if (projectRepository.count() == 0) {
            List<Project> projects = Arrays.asList(
                    Project.builder()
                            .name("Authentication System")
                            .repo("github.com/example/devflow-auth")
                            .summary("Token handoff, backend verification, and RBAC prep.")
                            .build(),
                    Project.builder()
                            .name("Review Zone")
                            .repo("github.com/example/devflow-review-zone")
                            .summary("PR link validation, reviewer states, and history visibility.")
                            .build(),
                    Project.builder()
                            .name("Team-Code Onboarding")
                            .repo("github.com/example/devflow-team-code")
                            .summary("Join-link flow, approval states, and admin management.")
                            .build()
            );
            projectRepository.saveAll(projects);
        }

        // Seed Tasks
        if (taskRepository.count() == 0) {
            Task task1 = Task.builder()
                    .id("task-auth-handoff")
                    .title("Auth handoff to Spring filter")
                    .description("Ship the Firebase token handoff to the Java backend and surface auth setup status honestly.")
                    .assignee("Ava")
                    .status(TaskStatus.UNDER_REVIEW)
                    .priority(Priority.HIGH)
                    .githubLink("https://github.com/example/devflow/pull/184")
                    .deadline("2026-06-18")
                    .comments(4)
                    .createdAt(LocalDateTime.now().minusDays(5))
                    .updatedAt(LocalDateTime.now())
                    .checkpoints(Arrays.asList(
                            TaskCheckpoint.builder().id("cp-auth-1").title("Frontend sends bearer token").completed(true).build(),
                            TaskCheckpoint.builder().id("cp-auth-2").title("Setup warning copy added").completed(true).build(),
                            TaskCheckpoint.builder().id("cp-auth-3").title("Backend verification contract documented").completed(false).build()
                    ))
                    .build();

            Task task2 = Task.builder()
                    .id("task-persistent-store")
                    .title("Persistent task workspace store")
                    .description("Add local task persistence so list, kanban, and timeline views reflect the same source of truth.")
                    .assignee("Mira")
                    .status(TaskStatus.IN_PROGRESS)
                    .priority(Priority.HIGH)
                    .githubLink("https://github.com/example/devflow/issues/221")
                    .deadline("2026-06-19")
                    .comments(2)
                    .createdAt(LocalDateTime.now().minusDays(4))
                    .updatedAt(LocalDateTime.now().minusDays(1))
                    .checkpoints(Arrays.asList(
                            TaskCheckpoint.builder().id("cp-task-1").title("Task type model defined").completed(true).build(),
                            TaskCheckpoint.builder().id("cp-task-2").title("Kanban status mapping added").completed(false).build(),
                            TaskCheckpoint.builder().id("cp-task-3").title("Timeline grouping polished").completed(false).build()
                    ))
                    .build();

            Task task3 = Task.builder()
                    .id("task-team-code")
                    .title("Team code onboarding preview")
                    .description("Prepare the team-code onboarding flow for member invites and join-link distribution.")
                    .assignee("Nia")
                    .status(TaskStatus.PENDING)
                    .priority(Priority.MEDIUM)
                    .githubLink("https://github.com/example/devflow/pull/203")
                    .deadline("2026-06-20")
                    .comments(1)
                    .createdAt(LocalDateTime.now().minusDays(3))
                    .updatedAt(LocalDateTime.now().minusDays(2))
                    .checkpoints(Arrays.asList(
                            TaskCheckpoint.builder().id("cp-team-1").title("Generate demo code").completed(false).build(),
                            TaskCheckpoint.builder().id("cp-team-2").title("Join route prefills code").completed(false).build(),
                            TaskCheckpoint.builder().id("cp-team-3").title("Copy join link action").completed(false).build()
                    ))
                    .build();

            taskRepository.saveAll(Arrays.asList(task1, task2, task3));
        }

        // Seed Reviews
        if (reviewRepository.count() == 0) {
            Review review1 = Review.builder()
                    .id("review-auth-handoff")
                    .taskTitle("Auth handoff to Spring filter")
                    .message("Backend token verification copy is ready. Need security review before merge.")
                    .reviewer("Jordan")
                    .submittedBy("Ava")
                    .submittedAt(LocalDateTime.now().minusHours(8))
                    .githubLink("https://github.com/example/devflow/pull/184")
                    .status(ReviewStatus.REVIEWING)
                    .build();

            Review review2 = Review.builder()
                    .id("review-team-code")
                    .taskTitle("Team code onboarding preview")
                    .message("Join link preview is wired. Waiting for admin UX comments.")
                    .reviewer("Mira")
                    .submittedBy("Nia")
                    .submittedAt(LocalDateTime.now().minusHours(24))
                    .githubLink("https://github.com/example/devflow/pull/203")
                    .status(ReviewStatus.WAITING_FOR_REVIEW)
                    .build();

            reviewRepository.saveAll(Arrays.asList(review1, review2));
        }
    }
}
