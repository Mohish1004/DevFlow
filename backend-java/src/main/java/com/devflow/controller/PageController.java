package com.devflow.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/product")
    public String product() {
        return "product";
    }

    @GetMapping("/features")
    public String features() {
        return "features";
    }

    @GetMapping("/solutions")
    public String solutions() {
        return "solutions";
    }

    @GetMapping("/pricing")
    public String pricing() {
        return "pricing";
    }

    @GetMapping("/contact-sales")
    public String contactSales() {
        return "contact-sales";
    }
}
