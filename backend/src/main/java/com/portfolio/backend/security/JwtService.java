package com.portfolio.backend.security;

import java.util.Date;

import org.springframework.stereotype.Service;

import com.portfolio.backend.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import io.jsonwebtoken.Claims;

@Service
public class JwtService {
	public String extractEmail(String token) {

	    Claims claims = Jwts.parserBuilder()
	            .setSigningKey(SECRET_KEY)
	            .build()
	            .parseClaimsJws(token)
	            .getBody();

	    return claims.getSubject();
	}

    private final SecretKey SECRET_KEY = 
        Keys.hmacShaKeyFor("mysecretkeymysecretkeymysecretkey12".getBytes());

    public String generateToken(User user) {

    	return Jwts.builder()
    	        .setSubject(user.getEmail())
    	        .claim("role", user.getRole().name())
    	        .setIssuedAt(new Date())
    	        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
    	        .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
    	        .compact();
    }
}