package com.example.cattracker.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {

    @GetMapping(value = "/{path:^(?!api|assets|css|js|images|favicon\\.ico|index\\.html$).*$}")
    public String redirect() {
        return "forward:/index.html";
    }

    @GetMapping(value = "/{path:^(?!api|assets|css|js|images|favicon\\.ico|index\\.html$).*$}/**")
    public String redirectWithSubPaths() {
        return "forward:/index.html";
    }
}