package com.portfolio.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class StudentPortfolioPlatformApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentPortfolioPlatformApplication.class, args);
	}

}
