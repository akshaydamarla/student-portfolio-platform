package com.portfolio.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 2000)
    private String description;

    private String techStack;

    private String imageUrl;
    
    private String status;    
    private int progress; 
    
    private String feedback;
    private boolean approved;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}