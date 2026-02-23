package com.portfolio.backend.controller;

import com.portfolio.backend.model.Project;
import com.portfolio.backend.model.User;
import com.portfolio.backend.repository.ProjectRepository;
import com.portfolio.backend.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/student")
@PreAuthorize("hasRole('STUDENT')")
public class StudentController {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public StudentController(ProjectRepository projectRepository,
                             UserRepository userRepository,
                             PasswordEncoder passwordEncoder) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ================= ADD PROJECT =================
    @PostMapping("/projects")
    public Project addProject(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam String techStack,
            @RequestParam String status,
            @RequestParam int progress,
            @RequestParam("image") MultipartFile file,
            Authentication authentication) throws Exception {

        if (progress < 0 || progress > 100) {
            throw new RuntimeException("Progress must be between 0 and 100");
        }

        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        String uploadDir = System.getProperty("user.dir") + "/uploads/";
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        String filePath = uploadDir + fileName;
        file.transferTo(new File(filePath));

        Project project = new Project();
        project.setTitle(title);
        project.setDescription(description);
        project.setTechStack(techStack);
        project.setStatus(status);
        project.setProgress(progress);
        project.setImageUrl("/uploads/" + fileName);
        project.setUser(user);

        return projectRepository.save(project);
    }

    // ================= GET MY PROJECTS =================
    @GetMapping("/projects")
    public List<Project> getMyProjects(Authentication authentication) {

        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        return projectRepository.findByUser(user);
    }

    // ================= DELETE PROJECT =================
    @DeleteMapping("/projects/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id,
                                           Authentication authentication) {

        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (!project.getUser().getId().equals(user.getId())) {
            return ResponseEntity.badRequest()
                    .body("You are not allowed to delete this project");
        }

        try {
            String imagePath = System.getProperty("user.dir") + project.getImageUrl();
            File file = new File(imagePath);
            if (file.exists()) {
                file.delete();
            }
        } catch (Exception e) {
            System.out.println("Image delete failed: " + e.getMessage());
        }

        projectRepository.delete(project);

        return ResponseEntity.ok("Project deleted successfully");
    }

    // ================= GET PROFILE =================
    @GetMapping("/profile")
    public User getProfile(Authentication authentication) {

        String email = authentication.getName();
        return userRepository.findByEmail(email).orElseThrow();
    }

    // ================= UPDATE PROFILE =================
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            @RequestParam String name,
            @RequestParam(required = false) String password,
            Authentication authentication) {

        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        user.setName(name);

        if (password != null && !password.isEmpty()) {
            user.setPassword(passwordEncoder.encode(password));
        }

        userRepository.save(user);

        return ResponseEntity.ok("Profile updated successfully");
    }
}