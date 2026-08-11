package com.portfolio.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.portfolio.backend.model.Project;
import com.portfolio.backend.model.User;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByUser(User user);
}