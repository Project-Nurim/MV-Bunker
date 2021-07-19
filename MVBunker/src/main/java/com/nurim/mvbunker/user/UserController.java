package com.nurim.mvbunker.user;
import com.nurim.mvbunker.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping("/login")
    public void toLoginPage() {}

    @GetMapping("/join")
    public void toJoinPage() {}

    @PostMapping("/join")
    public String JoinUser(UserEntity param, Model model) {
        model.addAttribute("needAuth", 1);
        service.join(param);
        return "redirect:/user/login";
    }
}