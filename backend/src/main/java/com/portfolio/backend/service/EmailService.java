package com.portfolio.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class EmailService {

    @Value("${brevo.api.key}")
    private String apiKey;

    public void sendOtp(String toEmail, String otp) {
        try {
            URL url = new URL("https://api.brevo.com/v3/smtp/email");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setRequestProperty("accept", "application/json");
            conn.setRequestProperty("api-key", apiKey);
            conn.setRequestProperty("content-type", "application/json");
            conn.setDoOutput(true);

            String body = """
            {
              "sender": { "email": "akshaydamarla1@gmail.com", "name": "Student Portfolio" },
              "to": [{ "email": "%s" }],
              "subject": "Password Reset OTP",
              "htmlContent": "<h2>Password Reset</h2><p>Your OTP is:</p><h1 style='color:#2563eb;'>%s</h1><p>This OTP is valid for 5 minutes.</p>"
            }
            """.formatted(toEmail, otp);

            try (OutputStream os = conn.getOutputStream()) {
                os.write(body.getBytes());
            }

            int responseCode = conn.getResponseCode();
            System.out.println("Email sent: " + responseCode);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}