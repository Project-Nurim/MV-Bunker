package com.nurim.mvbunker.user;

import com.nurim.mvbunker.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller("/user")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping("/join")
    public void toJoinPage() {}

    @PostMapping("/join")
    public String JoinUser(UserEntity param) {
        return null;
    }
}
