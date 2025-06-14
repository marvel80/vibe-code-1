package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String hello() {
        return "Welcome to Spring Boot Application!";
    }

    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello, World!";
    }
} 