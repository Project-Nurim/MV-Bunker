package com.nurim.mvbunker.common;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("")
public class CommonController {
    @GetMapping("/home")
    public void toLoginPage(@RequestParam(value = "error", required = false) String error, @RequestParam(value = "exception", required = false) String exception,
                            Model model)
    {
        model.addAttribute("error",error);
        model.addAttribute("exception",exception);
    }

    @GetMapping("/developers")
    public void toDevelopers() {}
}
