package com.portfolio.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/test/secure")
    public String secureEndpoint() {
        return "You accessed secure endpoint 🎉";
    }
    @GetMapping("/health")
    public Object health(){
        Map<String,Object> response = new HashMap<>();
        response.put("Status",HttpStatus.OK);
        response.put("Message","Healthy Server");
        return response;
    }
}