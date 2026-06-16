package com.devflow.controller;

import com.devflow.model.*;
import com.devflow.repository.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/app")
public class WorkspaceController {

    private final UserRepository userRepository;
    private final UserPreferencesRepository userPreferencesRepository;
    private final TaskRepository taskRepository;
    private final ReviewRepository reviewRepository;
    private final ProjectRepository projectRepository;

    public WorkspaceController(UserRepository userRepository,
                               UserPreferencesRepository userPreferencesRepository,
                               TaskRepository taskRepository,
                               ReviewRepository reviewRepository,
                               ProjectRepository projectRepository) {
        this.userRepository = userRepository;
        this.userPreferencesRepository = userPreferencesRepository;
        this.taskRepository = taskRepository;
        this.reviewRepository = reviewRepository;
        this.projectRepository = projectRepository;
    }

    @ModelAttribute
    public void addCommonAttributes(Model model, Principal principal) {
        if (principal != null) {
            User user = userRepository.findByEmail(principal.getName()).orElse(null);
            model.addAttribute("currentUser", user);
            if (user != null) {
                UserPreferences prefs = userPreferencesRepository.findByUser(user).orElse(null);
                model.addAttribute("preferences", prefs);
            }
        }
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        List<Task> tasks = taskRepository.findAll();
        List<Review> reviews = reviewRepository.findAll();
        List<Project> projects = projectRepository.findAll();
        
        model.addAttribute("tasks", tasks);
        model.addAttribute("reviews", reviews);
        model.addAttribute("projects", projects);
        model.addAttribute("currentPath", "/app/dashboard");
        return "app/dashboard";
    }

    @GetMapping("/projects")
    public String projects(Model model) {
        List<Project> projects = projectRepository.findAll();
        model.addAttribute("projects", projects);
        model.addAttribute("currentPath", "/app/projects");
        return "app/projects";
    }

    @GetMapping("/tasks")
    public String tasks(Model model) {
        List<Task> tasks = taskRepository.findAll();
        model.addAttribute("tasks", tasks);
        model.addAttribute("currentPath", "/app/tasks");
        return "app/tasks";
    }

    @GetMapping("/review")
    public String review(Model model) {
        List<Review> reviews = reviewRepository.findAll();
        model.addAttribute("reviews", reviews);
        model.addAttribute("currentPath", "/app/review");
        return "app/review";
    }

    @GetMapping("/docs")
    public String docs(Model model) {
        model.addAttribute("currentPath", "/app/docs");
        return "app/docs";
    }

    @GetMapping("/meet")
    public String meet(Model model) {
        model.addAttribute("currentPath", "/app/meet");
        return "app/meet";
    }

    @GetMapping("/analytics")
    public String analytics(Model model) {
        model.addAttribute("currentPath", "/app/analytics");
        return "app/analytics";
    }

    @GetMapping("/integrations")
    public String integrations(Model model) {
        model.addAttribute("currentPath", "/app/integrations");
        return "app/integrations";
    }

    @GetMapping("/admin")
    public String admin(Model model) {
        model.addAttribute("currentPath", "/app/admin");
        return "app/admin";
    }

    @GetMapping("/assistant")
    public String assistant(Model model) {
        model.addAttribute("currentPath", "/app/assistant");
        return "app/assistant";
    }

    @GetMapping("/settings")
    public String settings(Model model) {
        model.addAttribute("currentPath", "/app/settings");
        return "app/settings";
    }

    @GetMapping("/appearance")
    public String appearance(Model model) {
        model.addAttribute("currentPath", "/app/appearance");
        return "app/appearance";
    }
}
