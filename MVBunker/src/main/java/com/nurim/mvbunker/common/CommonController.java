package com.nurim.mvbunker.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("")
public class CommonController {
    @GetMapping("/home")
    public void toLoginPage() {}

    @GetMapping("/developers")
    public void toDevelopers() {}
}
