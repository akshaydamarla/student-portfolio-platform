package com.portfolio.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;
    @Async
    public void sendOtp(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject("🔐 Password Reset Request - Student Portfolio Platform");

        message.setText(
            "Dear User,\n\n" +
            "We received a request to reset your password for your Student Portfolio account.\n\n" +

            "🔑 Your One-Time Password (OTP) is: " + otp + "\n\n" +

            "This OTP is valid for a limited time. Please do not share it with anyone for security reasons.\n\n" +

            "If you did not request a password reset, please ignore this email or contact support.\n\n" +

            "Best regards,\n" +
            "Student Portfolio Platform Team\n" +
            "-----------------------------\n" +
            "This is an automated email. Please do not reply."
        );

        mailSender.send(message);
    }
}