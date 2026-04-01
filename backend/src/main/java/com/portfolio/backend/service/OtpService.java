package com.portfolio.backend.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class OtpService {

    private Map<String, String> otpStorage = new HashMap<>();

    public String generateOtp(String email) {
        String otp = String.valueOf((int)(Math.random() * 900000) + 100000);
        otpStorage.put(email, otp);
        return otp;
    }

    public boolean verifyOtp(String email, String otp) {
        return otp.equals(otpStorage.get(email));
    }

    public void clearOtp(String email) {
        otpStorage.remove(email);
    }
}