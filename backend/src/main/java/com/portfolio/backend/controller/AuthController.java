package com.portfolio.backend.controller;

import com.portfolio.backend.dto.LoginRequest;
import com.portfolio.backend.dto.RegisterRequest;
import com.portfolio.backend.model.User;
import com.portfolio.backend.repository.UserRepository;
import com.portfolio.backend.security.JwtService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Value("${recaptcha.secret}")
    private String recaptchaSecret;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // ================= REGISTER =================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        if (!validateCaptcha(request.getCaptchaToken())) {
            return ResponseEntity.badRequest().body("Captcha verification failed");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        if (!validateCaptcha(request.getCaptchaToken())) {
            return ResponseEntity.badRequest().body("Captcha verification failed");
        }

        var userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        return ResponseEntity.ok(token);
    }

    // ================= CAPTCHA VALIDATION =================
    private boolean validateCaptcha(String token) {

        try {
            if (token == null || token.isEmpty()) {
                return false;
            }

            String url = "https://www.google.com/recaptcha/api/siteverify";
            String params = "secret=" + recaptchaSecret + "&response=" + token;

            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("POST");
            con.setDoOutput(true);

            try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                wr.writeBytes(params);
                wr.flush();
            }

            StringBuilder response = new StringBuilder();

            try (BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()))) {

                String inputLine;
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
            }

            // More reliable check
            return response.toString().contains("\"success\": true");

        } catch (Exception e) {
            return false;
        }
    }
}