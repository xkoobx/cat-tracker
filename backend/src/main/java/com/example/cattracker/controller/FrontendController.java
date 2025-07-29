package com.example.cattracker.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {

    @GetMapping("/{date}/{timeOfDay}")
    public String forward() {
        return "forward:/index.html";
    }

}