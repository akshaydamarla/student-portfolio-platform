package com.portfolio.backend.controller;

import com.portfolio.backend.model.User;
import com.portfolio.backend.model.Project;
import com.portfolio.backend.repository.UserRepository;
import com.portfolio.backend.repository.ProjectRepository;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    public AdminController(UserRepository userRepository,
                           ProjectRepository projectRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
    }

    // 🔹 View all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 🔹 View all projects
    @GetMapping("/projects")
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // 🔹 Delete any project
    @DeleteMapping("/projects/{id}")
    public String deleteProject(@PathVariable Long id) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        projectRepository.delete(project);

        return "Project deleted by admin";
    }

    // 🔹 Review project (Approve / Reject + Feedback)
    @PutMapping("/projects/{id}/review")
    public Project reviewProject(
            @PathVariable Long id,
            @RequestParam boolean approved,
            @RequestParam String feedback) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        project.setApproved(approved);
        project.setFeedback(feedback);

        return projectRepository.save(project);
    }
    
    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole().name().equals("ADMIN")) {
            throw new RuntimeException("Admins cannot delete other admins");
        }

        userRepository.delete(user);

        return "User deleted successfully";
    }
}